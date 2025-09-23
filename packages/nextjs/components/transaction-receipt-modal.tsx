"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Download, ExternalLink, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Transaction {
  id: string
  type: string
  amount: number
  description: string
  date: string
  time: string
  status: string
  txHash: string
  from: string
  to: string
  invoiceId?: string
  fee: number
  network: string
}

interface TransactionReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function TransactionReceiptModal({ isOpen, onClose, transaction }: TransactionReceiptModalProps) {
  if (!transaction) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "payment":
        return "Payment Received"
      case "advance":
        return "Advance Funding"
      case "withdrawal":
        return "Withdrawal"
      case "advance_repayment":
        return "Advance Repayment"
      default:
        return type
    }
  }

  const copyTxHash = () => {
    navigator.clipboard.writeText(transaction.txHash)
    // In a real app, would show a toast notification
    console.log("Transaction hash copied:", transaction.txHash)
  }

  const openInExplorer = () => {
    // In a real app, would open the transaction in a blockchain explorer
    window.open(`https://etherscan.io/tx/${transaction.txHash}`, "_blank")
  }

  const downloadReceipt = () => {
    // In a real app, would generate and download a PDF receipt
    console.log("Downloading receipt for transaction:", transaction.id)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {getStatusIcon(transaction.status)}
            <span className="ml-2">Transaction Receipt</span>
          </DialogTitle>
          <DialogDescription>Transaction ID: {transaction.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="text-center">
            <Badge className={getStatusColor(transaction.status)} variant="secondary">
              {transaction.status.toUpperCase()}
            </Badge>
          </div>

          {/* Amount */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Amount</p>
            <p
              className={`text-3xl font-bold ${
                transaction.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">{getTypeLabel(transaction.type)}</p>
          </div>

          <Separator />

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">From:</p>
                <p className="font-medium text-foreground">{transaction.from}</p>
              </div>
              <div>
                <p className="text-muted-foreground">To:</p>
                <p className="font-medium text-foreground">{transaction.to}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Date:</p>
                <p className="font-medium text-foreground">{transaction.date}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Time:</p>
                <p className="font-medium text-foreground">{transaction.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Network:</p>
                <p className="font-medium text-foreground">{transaction.network}</p>
              </div>
              {transaction.fee > 0 && (
                <div>
                  <p className="text-muted-foreground">Fee:</p>
                  <p className="font-medium text-foreground">${transaction.fee.toFixed(2)}</p>
                </div>
              )}
            </div>

            {transaction.invoiceId && (
              <div className="text-sm">
                <p className="text-muted-foreground">Related Invoice:</p>
                <p className="font-medium text-foreground">{transaction.invoiceId}</p>
              </div>
            )}

            <div className="text-sm">
              <p className="text-muted-foreground">Description:</p>
              <p className="font-medium text-foreground">{transaction.description}</p>
            </div>
          </div>

          <Separator />

          {/* Transaction Hash */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Transaction Hash:</p>
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
              <code className="text-xs font-mono flex-1 break-all">{transaction.txHash}</code>
              <Button variant="ghost" size="sm" onClick={copyTxHash} className="h-8 w-8 p-0">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={downloadReceipt} className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={openInExplorer} className="flex-1 bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>This receipt is generated by StableWage Network</p>
            <p>Keep this for your records</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
