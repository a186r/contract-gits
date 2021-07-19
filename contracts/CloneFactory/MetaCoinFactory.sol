// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./CloneFactory.sol";
import "@0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";
import "./MetaCoin.sol";

contract MetaCoinFactory is CloneFactory, Ownable {    
    address public libraryAddress;
    address private metaCoinOwner;

    event MetaCoinCreated(address newMetaCoinAddress);

    constructor(address _libraryAddress) {
        libraryAddress = _libraryAddress;
    }

    function setLibraryAddress(address _libraryAddress) public onlyOwner {
        libraryAddress = _libraryAddress;
    }

    function createMetaCoin(address _metaCoinOwner, uint256 _initialSupply) external {
        MetaCoin metaCoin = MetaCoin(createClone(libraryAddress));
        metaCoin.initialize(_metaCoinOwner, _initialSupply);
        MetaCoinCreated(address(metaCoin));
    }

    function isCloned(address _targetAddress) external view returns (bool) {
        return isClone(_targetAddress, libraryAddress);
    }
}