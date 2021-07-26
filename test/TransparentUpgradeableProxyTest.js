const { ethers, upgrades } = require('hardhat');

describe("Proxy EIP1167", function() {
    it('test deploy', async function() {
            // Deploying
    const Params = await ethers.getContractFactory("Params");
    const instance = await upgrades.deployProxy(Params, 1);
    await instance.deployed();
    console.log(instance.address);
    console.log("hello world");
    });
})