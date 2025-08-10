// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TippingContract is ERC20, Ownable {
    constructor() ERC20("CretoFam USDC", "cUSDC") Ownable(msg.sender) {
        // Mint some initial USDC for testing
        _mint(msg.sender, 1000 * 10**decimals());
    }

    function tipCreator(address creator, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _transfer(msg.sender, creator, amount);
    }

    function transferUSDC(address from, address to, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(from) >= amount, "Insufficient balance");
        
        _transfer(from, to, amount);
    }

    function withdrawTips() external onlyOwner {
        uint256 balance = balanceOf(address(this));
        require(balance > 0, "No tips to withdraw");
        
        _transfer(address(this), owner(), balance);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

