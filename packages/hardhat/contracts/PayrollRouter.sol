// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

// Lightweight contract solely for logging payments, providing an on-chain receipt.
// This contract fulfills the requirement of emitting Paid events [1, 2].

contract PayrollRouter {

    // Stores the address of the USDCT stablecoin this router recognizes
    address public usdctToken;

    // Event emitted when a payment is officially routed/recorded
    event Paid(
        bytes32 indexed invoiceId,
        address indexed payer,
        address indexed recipient, // PROFESSIONALLY REFINED: Added 'recipient' for full logging context
        uint256 amount
    );

    constructor(address _usdctToken) {
        usdctToken = _usdctToken;
    }

    // Function callable by the Escrow or Platform to record a successful payment.
    function recordPayment(
        bytes32 invoiceId,
        address payer,
        address recipient, // This parameter is now utilized in the event below
        uint256 amount
    ) external {
        // No complex logic or token transfer; just logging for proof/receipts [1].
        // REFINED: Emitting all four parameters, including the recipient address.
        emit Paid(invoiceId, payer, recipient, amount);
    }
}