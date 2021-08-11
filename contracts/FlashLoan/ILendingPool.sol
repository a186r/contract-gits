// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ILendingPool{
    function addressProvider() external view returns (address);
    function deposit(address _reserve, uint256 _amount, uint16 _referralCode) external payable;
    function redeemUnderlying(address _reserve, address _user, uint256 _amount) external;
    function borrow(address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode) external;
    function repay(address _reserve, uint256 _amount, address _onBehalfOf) external payable;
    function swapBorrowRateMode(address _reserve) external;
    function rebalanceFixedBorrowRote(address _reserve, address _user) external;
    function setUserUseReserveAsCollateral(address _reserve, bool _useAsCollateral) external;
    function liquidationCall(address _collateral, address _reserve, address _user, uint256 _purchaseAmount, bool _receiveAToken) external payable;
    function flashLoan(address _receiver, address _reserve, uint256 _amount, bytes calldata _params) external;
    
}