// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC20Interface.sol";

// Contract responsible for holding and managing USDCT funds for specific invoices.
contract EscrowContract {
    address public immutable usdctToken;
    address public immutable platformTreasury;
    
    // Tracks the total USDCT balance held for each unique invoice ID
    mapping(bytes32 => uint256) public invoiceBalances;
    
    // Events required for UI tracking and MVP proof [1, 8].
    event Escrowed(bytes32 indexed invoiceId, address indexed employer, uint256 amount);
    event Released(bytes32 indexed invoiceId, address indexed freelancer, uint256 amount);
    
    // Minimal state tracking (0: Pending, 1: Funded, 2: Paid/Settled)
    mapping(bytes32 => uint8) public invoiceStatus;

    constructor(address _usdctToken, address _platformTreasury) {
        usdctToken = _usdctToken;
        platformTreasury = _platformTreasury;
    }

    // Deposits stablecoins into the contract for a specific invoice ID.
    // This requires the Employer to have called approve() first [9, 10].
    function deposit(
        bytes32 invoiceId,
        address employer,
        uint256 amount
    ) external returns (bool) {
        require(amount > 0, "Deposit amount must be greater than zero");
        require(invoiceStatus[invoiceId] == 0, "Invoice is already funded or settled");
        
        // Use transferFrom to pull tokens from the employer's wallet
        bool success = IERC20(usdctToken).transferFrom(
            employer,
            address(this),
            amount
        );
        require(success, "Token transfer failed");

        invoiceBalances[invoiceId] = amount;
        invoiceStatus[invoiceId] = 1; // Mark as Funded

        emit Escrowed(invoiceId, employer, amount);
        return true;
    }

    // Releases the final payment amount (remainder after advance repayment) to the freelancer.
    // NOTE: This assumes advance repayment logic is handled externally or within a more complex release flow.
    // For this MVP, we implement a simple release function [8].
    function releasePayment(
        bytes32 invoiceId,
        address freelancer,
        uint256 amountToFreelancer,
        uint256 advanceRepaymentAmount,
        address advancePool
    ) external returns (bool) {
        require(invoiceStatus[invoiceId] == 1, "Invoice must be funded");
        require(amountToFreelancer + advanceRepaymentAmount <= invoiceBalances[invoiceId], "Over-release attempt");
        
        // 1. Repay Advance Pool (Platform Treasury)
        if (advanceRepaymentAmount > 0) {
            bool successRepay = IERC20(usdctToken).transfer(
                advancePool,
                advanceRepaymentAmount
            );
            require(successRepay, "Advance repayment failed");
        }
        
        // 2. Pay Freelancer
        if (amountToFreelancer > 0) {
            bool successRelease = IERC20(usdctToken).transfer(
                freelancer,
                amountToFreelancer
            );
            require(successRelease, "Freelancer payment failed");
            
            emit Released(invoiceId, freelancer, amountToFreelancer);
        }

        // 3. Mark settled and clear balance
        invoiceStatus[invoiceId] = 2; // Mark as Paid/Settled
        invoiceBalances[invoiceId] = 0;

        return true;
    }

    // Helper to check the current escrow balance for an invoice
    function getInvoiceBalance(bytes32 invoiceId) external view returns (uint256) {
        return invoiceBalances[invoiceId];
    }
}