// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "hardhat/console.sol";

contract PairFactory is Ownable {
    address public master;

    event NewPair(address indexed contractAddress);

    using Clones for address;

    constructor(address _master) {
        master = _master;
    }

    function getPairAddress(bytes32 salt) external view returns (address){
        require(master != address(0), "master must be set");
        return master.predictDeterministicAddress(salt);
    }

    function createPair(bytes32 salt) external payable {
        emit NewPair(master.cloneDeterministic(salt));
    }
}