// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title IFlashLoanReceiver 接口
/// @dev 实现这个接口，开发aave闪电贷
interface IFlashLoanReceiver {
    function executeOperation(address _reserve, uint256 _amount, uint256 _fee, bytes calldata _params) external;
}