// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract MetaCoin {
    mapping(address => uint) balances;

    function initialize(address metaCoinOwner, uint256 initialBalance) external {
        balances[metaCoinOwner] = initialBalance;
    }

    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        return true;
    }

    function BalancesOf(address addr) public view returns(uint) {
        return balances[addr];
    }
}