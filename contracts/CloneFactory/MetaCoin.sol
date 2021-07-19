// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MetaCoin is ERC20{
    constructor (uint256 initialSupply) ERC20 ("MetaCoin", "MTC") {
        _mint(msg.sender, initialSupply);
    }
}