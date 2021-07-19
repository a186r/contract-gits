const { expect } = require("chai");

describe("Clone Factory", function() {

    it("clone factory test", async function() {
        const [owner] = await ethers.getSigners();

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
        // const balance = await newMetaCoin.balanceOf(owner.address);
        // await expect(balance.to.equal(100));

        console.log("metaCoin address is: " + metaCoin.address);
        // console.log("newMetaCoin address is: " + newMetaCoin.address);

        // console.log("owner balance is: " + balance);
    });
})