const {ethers} = require("hardhat");

async function main() {
    // deploying contract
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello World");
    console.log("greeter address is: " + greeter.address);
}

main()