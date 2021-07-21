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
        pairMaster = await (await ethers.getContractFactory("Pair")).deploy();

        pairStandaloneGas = await getGas(await pairMaster.deployTransaction)
        // expect(pairMaster.address).to.exist
        console.log(pairStandaloneGas);
    });

    it("Should deploy PairFactory contract", async function () {
        pairFactory = await (await ethers.getContractFactory("PairFactory")).deploy(pairMaster.address);
        expect(pairFactory.address).to.exist;
      });
})