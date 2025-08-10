// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CretoFamNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    constructor() ERC721("CretoFam Fan Pass", "CFAN") Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory metadataURI) external returns (uint256) {
        uint256 tokenId = ++nextTokenId;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, metadataURI);
        return tokenId;
    }
}

