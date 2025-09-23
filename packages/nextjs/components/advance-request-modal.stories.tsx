import type { Meta, StoryObj } from "@storybook/react"
import { AdvanceRequestModal } from "./advance-request-modal"

const meta: Meta<typeof AdvanceRequestModal> = {
  title: "Components/AdvanceRequestModal",
  component: AdvanceRequestModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "modal closed" },
    onSubmit: { action: "advance requested" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const mockInvoice = {
  id: "inv-001",
  number: "INV-2024-001",
  amount: 5000,
  currency: "USDC",
  status: "sent" as const,
  clientName: "Acme Corp",
  dueDate: "2024-02-15",
  description: "Web Development Services",
}

export const Default: Story = {
  args: {
    isOpen: true,
    invoice: mockInvoice,
  },
}

export const HighValueInvoice: Story = {
  args: {
    isOpen: true,
    invoice: {
      ...mockInvoice,
      amount: 25000,
      number: "INV-2024-025",
      clientName: "Enterprise Client",
    },
  },
}

export const LowValueInvoice: Story = {
  args: {
    isOpen: true,
    invoice: {
      ...mockInvoice,
      amount: 1000,
      number: "INV-2024-010",
      clientName: "Small Business",
    },
  },
}
