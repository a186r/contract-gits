const { expect } = require("chai");
const {ethers} = require("hardhat");
const {getContractAddress} = require("@ethersproject/address");

describe("Clone Factory", function() {
    it("clone factory test", async function() {
        const [owner, owner2] = await ethers.getSigners();
        // 部署MetaCoin合约
        const MetaCoinInstance = await ethers.getContractFactory("MetaCoin");
        const metaCoin = await MetaCoinInstance.deploy();
        
        await metaCoin.deployed();

        // 部署MetaCoinFactory合约
        const MetaCoinFactoryInstance = await ethers.getContractFactory("MetaCoinFactory");
        const metaCoinFactory = await MetaCoinFactoryInstance.deploy(metaCoin.address);

        await metaCoinFactory.deployed();

        // 调用createMetaCoin方法，创建newMetaCoin合约
        const newMetaCoin = await metaCoinFactory.createMetaCoin(owner, 100);
        const balance = await newMetaCoin.balanceOf(owner.address);
        await expect(balance.to.equal(100));

        console.log("metaCoin address is: " + metaCoin.address);
        console.log("newMetaCoin address is: " + newMetaCoin.address);

        // 获取即将部署的合约地址
        const transactionCount = await owner.getTransactionCount();
        const futureAddress = getContractAddress({
            from: owner.address,
            nonce: transactionCount
        })

        console.log("owner balance is: " + balance);
        console.log("owner address is： " + owner.address);
        console.log("owner2 address is： " + owner2.address);
        console.log("future address is: "+ futureAddress);

    });
})