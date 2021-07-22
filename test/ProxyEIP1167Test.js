const { expect } = require("chai");
const { formatBytes32String, getAddress } = require('ethers').utils

const salts = [formatBytes32String('1'), formatBytes32String('2')]

let pairMaster
let pairFactory
let pairStandaloneGas
let pairProxyGas

const DAI_ADDRESS = getAddress('0x6b175474e89094c44da98b954eedeac495271d0f');
const WETH_ADDRESS = getAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
const OGN_ADDRESS = getAddress('0x8207c1ffc5b6804f6024322ccf34f29c3541ae26');

const getGas = async (tx) => {
    const receipt = await ethers.provider.getTransactionReceipt(tx.hash)
    return receipt.gasUsed.toString()
}

describe("Proxy EIP1167", function() {
    it("部署主pair合约", async function () {
        // pairMaster就是母合约
        pairMaster = await (await ethers.getContractFactory("Pair")).deploy();
        // 单独部署pair合约花费的gas费
        pairStandaloneGas = await getGas(await pairMaster.deployTransaction)
        expect(pairMaster.address).to.exist
    });

    it("部署PairFactory合约", async function () {
        pairFactory = await (await ethers.getContractFactory("PairFactory")).deploy(pairMaster.address);
        expect(pairFactory.address).to.exist;
    });

    it("部署一个pair合约的克隆合约并允许自定义pair信息的初始化", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        // 调用pairFactory合约的getPairAddress方法预先计算合约地址
        const pairAddress = await pairFactory.getPairAddress(salts[0]);
        expect(pairAddress).to.exist;

        // 计算creatPair消耗的gas
        const tx = await pairFactory.createPair(salts[0]);
        await tx.wait();
        // clone pair花费的gas费
        pairProxyGas = await getGas(tx)

        // new ethers.Contract( address , abi , signerOrProvider )
        const pair1 = new ethers.Contract(
            pairAddress, // address
            [  // abi
                'function initialize(address _tokenA, address _tokenB) public',
                'function getPair() external view returns (address[] memory)',
            ],
            addr2  //signerOrProvider,无论用什么地址签名交易，最后部署完的合约地址都是一样的
        );
        // 校验地址是否一样
        expect(pair1.address).to.equal(pairAddress);

        let initTx = await pair1.initialize(WETH_ADDRESS, OGN_ADDRESS);
        await initTx.wait()

        // await expect(pair1.initialize(WETH_ADDRESS, OGN_ADDRESS)).to.be.revertedWith('Initializable: contract is already initialized');

        let tokens = await pair1.getPair()
        expect(tokens[0]).to.equal(WETH_ADDRESS)
        expect(tokens[1]).to.equal(OGN_ADDRESS)
    });

    it("节省了10倍gas？大概6倍左右", async function() {
        expect(Number(pairStandaloneGas)).to.be.greaterThan(Number(pairProxyGas)*6)
    });
})