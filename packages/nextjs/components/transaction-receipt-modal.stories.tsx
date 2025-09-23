import type { Meta, StoryObj } from "@storybook/react"
import { TransactionReceiptModal } from "./transaction-receipt-modal"

const meta: Meta<typeof TransactionReceiptModal> = {
  title: "Components/TransactionReceiptModal",
  component: TransactionReceiptModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "modal closed" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const mockTransaction = {
  id: "tx-001",
  type: "payment" as const,
  amount: 2500,
  currency: "USDC",
  status: "completed" as const,
  date: "2024-01-15T10:30:00Z",
  description: "Invoice Payment - INV-2024-001",
  txHash: "0x1234567890abcdef1234567890abcdef12345678",
  fromAddress: "0xabcd...5678",
  toAddress: "0x9876...dcba",
  networkFee: 2.5,
  processingFee: 25,
}

export const PaymentTransaction: Story = {
  args: {
    isOpen: true,
    transaction: mockTransaction,
  },
}

export const AdvanceTransaction: Story = {
  args: {
    isOpen: true,
    transaction: {
      ...mockTransaction,
      type: "advance" as const,
      description: "Advance Request - INV-2024-001",
      amount: 1750,
      processingFee: 17.5,
    },
  },
}

export const WithdrawalTransaction: Story = {
  args: {
    isOpen: true,
    transaction: {
      ...mockTransaction,
      type: "withdrawal" as const,
      description: "Withdrawal to Bank Account",
      amount: 5000,
      processingFee: 15,
    },
  },
}
