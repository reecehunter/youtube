// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";
import "@openzeppelin/contracts@4.5.0/utils/cryptography/MerkleProof.sol";

contract TestNFT is ERC721, Ownable {
    using Strings for uint256;

    // Variables
    bytes32 private root;

    uint256 public constant MAX_TOKENS = 10000;
    uint256 private constant TOKENS_RESERVED = 10;
    uint256 public price = 0;
    uint256 public MAX_MINT_PER_TX = 1000;
    uint256 public MAX_MINT_PER_WALLET = 1000;

    uint256 public totalSupply;
    bool public isSaleActive = false;
    bool public isWhitelistActive = false;
    mapping(address => uint256) private mintedPerWallet;
 
    string public baseUri;
    string public baseExtension = ".json";
 
    // Run on deploy
    constructor() ERC721("TestNFT", "TEST") {
        baseUri = "ipfs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/";
        for (uint256 i = 1; i <= TOKENS_RESERVED; ++i) {
            _safeMint(msg.sender, i);
        }
        totalSupply = TOKENS_RESERVED;
    }

    // Whitelist mint
    function whitelistMint(bytes32[] memory proof, uint256 _amount) external payable {
        require(isWhitelistActive, "Whitelist not active");
        require(isValid(proof, keccak256(abi.encodePacked(msg.sender))), "Not whitelisted");
        require(_amount <= MAX_MINT_PER_TX, "You can only mint a maximum of 5 per transaction.");
        require(mintedPerWallet[msg.sender] + _amount <= MAX_MINT_PER_WALLET, "You can only mint 5 per wallet.");
        uint256 curTotalSupply = totalSupply;
        require(curTotalSupply + _amount <= MAX_TOKENS, "Exceeds max tokens");
        require(_amount * price <= msg.value, "Incorrect ETH value");

        for (uint256 i = 1; i <= _amount; ++i) {
            _safeMint(msg.sender, curTotalSupply + i);
        }
        mintedPerWallet[msg.sender] += _amount;
        totalSupply += _amount;
    }

    // Public mint
    function publicMint(uint256 _amount) external payable {
        require(isSaleActive, "Public sale not active");
        require(_amount <= MAX_MINT_PER_TX, "You can only mint a maximum of 5 per transaction");
        require(mintedPerWallet[msg.sender] + _amount <= MAX_MINT_PER_WALLET, "You can only mint 5 per wallet");
        uint256 curTotalSupply = totalSupply;
        require(curTotalSupply + _amount <= MAX_TOKENS, "Exceeds max tokens");
        require(_amount * price <= msg.value, "Incorrect ETH value");
 
        for (uint256 i = 1; i <= _amount; ++i) {
            _safeMint(msg.sender, curTotalSupply + i);
        }
        mintedPerWallet[msg.sender] += _amount;
        totalSupply += _amount;
    }

    // Dev mint
    function devMint(uint256 _amount) external payable onlyOwner {
        uint256 curTotalSupply = totalSupply;
        require(curTotalSupply + _amount <= MAX_TOKENS, "Exceeds max tokens");
 
        for (uint256 i = 1; i <= _amount; ++i) {
            _safeMint(msg.sender, curTotalSupply + i);
        }
        mintedPerWallet[msg.sender] += _amount;
        totalSupply += _amount;
    }

    // Flip sale state
    function flipSaleState() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    // Flip whitelist state
    function flipWhitelistState() external onlyOwner {
        isWhitelistActive = !isWhitelistActive;
    }

    // Presale on
    function presaleOn() external onlyOwner {
        isSaleActive = false;
        isWhitelistActive = true;
    }

    // Public sale on
    function publicSaleOn() external onlyOwner {
        isSaleActive = true;
        isWhitelistActive = false;
    }

    // Check if proof is valid
    function isValid(bytes32[] memory proof, bytes32 leaf) public view returns (bool) {
        return MerkleProof.verify(proof, root, leaf);
    }

    // Set root
    function setRoot(bytes32 _root) public onlyOwner {
        root = _root;
    }

    // Set base URI
    function setBaseURI(string memory _baseUri) external onlyOwner {
        baseUri = _baseUri;
    }
 
    // Set price
    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    // Change max mint per wallet
    function setMaxMintPerWallet(uint256 _amount) external onlyOwner {
        MAX_MINT_PER_TX = _amount;
        MAX_MINT_PER_WALLET = _amount;
    }
 
    // Get token URI
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
            : "";
    }
 
    // Get base URI
    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

    // Withdraw ETH
    function withdrawAll() external payable onlyOwner {
        uint256 balance = address(this).balance;
        uint256 balanceOne = balance * 67 / 100;
        uint256 balanceTwo = balance * 33 / 100;
        (bool transferOne, ) = payable(0x21c9fc30A4aC35B0C8924f20aacD92c948cA14b5).call{value: balanceOne}("");
        (bool transferTwo, ) = payable(0x21c9fc30A4aC35B0C8924f20aacD92c948cA14b5).call{value: balanceTwo}("");
        require(transferOne && transferTwo, "Transfer failed.");
    }
}
