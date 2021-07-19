// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "@0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "@0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";

contract BitcoinNFT is NFTokenMetadata, Ownable{
    constructor() {
        nftName = "BTC HODLER";
        nftSymbol = "BTCH";
    }

    function _mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner {
        super._mint(_to, _tokenId);
        super._setTokenUri(_tokenId, _uri);
    }
}