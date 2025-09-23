import type { Meta, StoryObj } from "@storybook/react"
import { FileUpload } from "./file-upload"

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onFileSelect: { action: "file selected" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    accept: ".pdf,.jpg,.png",
    maxSize: 5 * 1024 * 1024, // 5MB
  },
}

export const ImageOnly: Story = {
  args: {
    accept: ".jpg,.jpeg,.png",
    maxSize: 2 * 1024 * 1024, // 2MB
  },
}

export const DocumentsOnly: Story = {
  args: {
    accept: ".pdf,.doc,.docx",
    maxSize: 10 * 1024 * 1024, // 10MB
  },
}
