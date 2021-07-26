const {ethers, upgrades} = require("hardhat");

async function main() {
    // deploying
    const Params = await ethers.getContractFactory("Params");
    const params = await upgrades.deployProxy(Params, [ethers.utils.formatBytes32String("0x0001"), 12], {initializer: 'SetUint256Param'})
    await params.deployed();
    console.log('Params deployed to: ', params.address);
    console.log("get hello params: ", (await params.GetUint256Param(ethers.utils.formatBytes32String("0x0001"))).toNumber());

    const ParamsV2 = await ethers.getContractFactory("ParamsV2");
    console.log("Upgrading Params...");
    await upgrades.upgradeProxy(params.address, ParamsV2);
    console.log('Params upgraded');

    const paramsv2 = await ParamsV2.attach(params.address);

    console.log("incrame: ", (await paramsv2.increment(ethers.utils.formatBytes32String("0x0001"))).toNumber());
}

main()