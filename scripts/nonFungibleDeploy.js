const {ethers} = require("hardhat");

async function main() {
    const BitcoinNFTInstance = await ethers.getContractFactory("BitcoinNFT");
    const owner = "0x339182FD236626d3880F443F7435D26BD1bA6eA5";
    const jsonUri = "https://ipfs.io/ipfs/QmXJPXdqbEbdgWoAn6Nm9GnfgyFya41ypkFjso1SnRXwZm";
    const bitcoinNFT = await BitcoinNFTInstance.deploy();

    await bitcoinNFT.deployed();

    await bitcoinNFT.functions._mint(owner, 1, jsonUri);
    
    console.log("bitcoinNFT deployed to:", bitcoinNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });