"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  CreditCard,
  ExternalLink,
  Copy,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { TransactionReceiptModal } from "@/components/transaction-receipt-modal"

// Mock transaction data
const mockTransactions = [
  {
    id: "TXN-001",
    type: "payment",
    amount: 850.0,
    description: "Payment from StartupXYZ",
    date: "2024-01-10",
    time: "14:32:15",
    status: "completed",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    from: "StartupXYZ",
    to: "Your Wallet",
    invoiceId: "INV-002",
    fee: 0,
    network: "Ethereum",
  },
  {
    id: "TXN-002",
    type: "advance",
    amount: 1470.0,
    description: "Advance on INV-003",
    date: "2024-01-08",
    time: "09:15:42",
    status: "completed",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    from: "StableWage Escrow",
    to: "Your Wallet",
    invoiceId: "INV-003",
    fee: 14.7,
    network: "Ethereum",
  },
  {
    id: "TXN-003",
    type: "withdrawal",
    amount: -500.0,
    description: "Withdrawal to bank account",
    date: "2024-01-05",
    time: "16:45:23",
    status: "completed",
    txHash: "0x9876543210fedcba9876543210fedcba98765432",
    from: "Your Wallet",
    to: "Bank Account ****1234",
    fee: 2.5,
    network: "Ethereum",
  },
  {
    id: "TXN-004",
    type: "payment",
    amount: 1800.0,
    description: "Payment from E-commerce Store",
    date: "2024-01-07",
    time: "11:20:18",
    status: "completed",
    txHash: "0xfedcba0987654321fedcba0987654321fedcba09",
    from: "E-commerce Store",
    to: "Your Wallet",
    invoiceId: "INV-007",
    fee: 0,
    network: "Ethereum",
  },
  {
    id: "TXN-005",
    type: "advance_repayment",
    amount: -1260.0,
    description: "Advance repayment for INV-007",
    date: "2024-01-07",
    time: "11:25:33",
    status: "completed",
    txHash: "0x1111222233334444555566667777888899990000",
    from: "Your Wallet",
    to: "StableWage Escrow",
    invoiceId: "INV-007",
    fee: 0,
    network: "Ethereum",
  },
  {
    id: "TXN-006",
    type: "withdrawal",
    amount: -750.0,
    description: "Withdrawal to bank account",
    date: "2024-01-03",
    time: "13:10:55",
    status: "pending",
    txHash: "0xaaaa1111bbbb2222cccc3333dddd4444eeee5555",
    from: "Your Wallet",
    to: "Bank Account ****1234",
    fee: 3.75,
    network: "Ethereum",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<(typeof mockTransactions)[0] | null>(null)
  const [showReceiptModal, setShowReceiptModal] = useState(false)

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <ArrowDownRight className="w-4 h-4 text-green-600" />
      case "advance":
        return <TrendingUp className="w-4 h-4 text-blue-600" />
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />
      case "advance_repayment":
        return <ArrowUpRight className="w-4 h-4 text-orange-600" />
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />
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

  const filteredTransactions = mockTransactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.to.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = typeFilter === "all" || transaction.type === typeFilter
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

      return matchesSearch && matchesType && matchesStatus
    })
    .sort((a, b) => new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime())

  const totalIncome = mockTransactions
    .filter((t) => t.amount > 0 && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalWithdrawn = Math.abs(
    mockTransactions
      .filter((t) => t.type === "withdrawal" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0),
  )

  const totalFees = mockTransactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + (t.fee || 0), 0)

  const handleViewReceipt = (transaction: (typeof mockTransactions)[0]) => {
    setSelectedTransaction(transaction)
    setShowReceiptModal(true)
  }

  const copyTxHash = (txHash: string) => {
    navigator.clipboard.writeText(txHash)
    // In a real app, would show a toast notification
    console.log("Transaction hash copied:", txHash)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Transactions</span>
              </div>
            </div>
            <Button asChild>
              <Link href="/withdraw">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Withdraw Funds
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">All-time earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalWithdrawn.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Withdrawn to bank</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalFees.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Platform fees paid</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View and manage all your transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="payment">Payments</SelectItem>
                  <SelectItem value="advance">Advances</SelectItem>
                  <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  <SelectItem value="advance_repayment">Repayments</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{getTypeLabel(transaction.type)}</p>
                          <p className="text-sm text-muted-foreground">{transaction.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p
                          className={`font-medium ${
                            transaction.amount > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        {transaction.fee > 0 && (
                          <p className="text-xs text-muted-foreground">Fee: ${transaction.fee.toFixed(2)}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-foreground">{transaction.date}</p>
                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {transaction.txHash.slice(0, 10)}...{transaction.txHash.slice(-8)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyTxHash(transaction.txHash)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReceipt(transaction)}
                          className="h-8"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Receipt
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Explorer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Receipt Modal */}
      <TransactionReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        transaction={selectedTransaction}
      />
    </div>
  )
}
