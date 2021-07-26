require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');

task("accounts", "Prints the list of accounts", async () => {
	const accounts = await ethers.getSigners();
  
	for (const account of accounts) {
	  console.log(account.address);
	}
});

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "8cpz4GUsIE7yt_-KR_X7XreAbrdX4dVn";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "26ac8cc1c2455de82e56d1373ac7490911665ab1e21c539f0c47f80161885afe";

module.exports = {
	solidity: {
		compilers:[
			{
				version: "0.8.2"
			},
			{
				version: "0.8.0"
			}
		],
		settings: {
		optimizer: {
			enabled: true,
			runs: 200
		}
		}
	},
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
		},
		ropsten: {
			url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
			accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
		},
		arbitrum: {
			url: `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
			accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
		}
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts"
	},
	mocha: {
		timeout: 20000
	}
};