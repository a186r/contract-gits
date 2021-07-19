const {ethers} = require("hardhat");

async function main(){
    const MetaCoinInstance = await ethers.getContractFactory("MetaCoin");
    const MetaCoinFactoryInstance = await ethers.getContractFactory("MetaCoinFactory");

    const metaCoin = await MetaCoinInstance.deploy();
    const metaCoinFactory = await MetaCoinFactoryInstance.deploy(metaCoin.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });