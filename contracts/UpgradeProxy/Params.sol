// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
    业务合约
 */
// contract Params is Initializable, OwnableUpgradeable{
contract Params {
    
    // // 初始化函数
    // function initialize() public initializer {
    //     __Ownable_init();
    // }

    mapping(bytes32 => uint256) private uint256Params;

    event Uint256Param(bytes32 indexed _key, uint256 _value);
    
    function SetUint256Param(bytes32 _key, uint256 _value) external {
        uint256Params[_key] = _value;
        emit Uint256Param(_key, _value);
    }

    function GetUint256Param(bytes32 _key) public view returns(uint256) {
        return uint256Params[_key];
    }
}