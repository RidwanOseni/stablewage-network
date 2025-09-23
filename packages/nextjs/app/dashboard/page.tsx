"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Wallet,
  CreditCard,
  Bell,
  Settings,
} from "lucide-react"
import Link from "next/link"

// Mock data
const mockData = {
  user: {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/professional-avatar.png",
  },
  balance: {
    available: 2450.75,
    pending: 1200.0,
    escrowed: 850.0,
  },
  recentInvoices: [
    {
      id: "INV-001",
      client: "TechCorp Inc",
      amount: 1200.0,
      status: "pending",
      dueDate: "2024-01-15",
      description: "Website Development",
    },
    {
      id: "INV-002",
      client: "StartupXYZ",
      amount: 850.0,
      status: "paid",
      paidDate: "2024-01-10",
      description: "Mobile App Design",
    },
    {
      id: "INV-003",
      client: "Enterprise Co",
      amount: 2100.0,
      status: "escrowed",
      escrowDate: "2024-01-08",
      description: "Full Stack Development",
    },
  ],
  advances: [
    {
      id: "ADV-001",
      invoiceId: "INV-003",
      amount: 1470.0, // 70% of 2100
      fee: 21.0, // 1% of advance
      status: "active",
      repaymentDate: "2024-01-25",
    },
  ],
  transactions: [
    {
      id: "TXN-001",
      type: "payment",
      amount: 850.0,
      description: "Payment from StartupXYZ",
      date: "2024-01-10",
      txHash: "0x1234...5678",
    },
    {
      id: "TXN-002",
      type: "advance",
      amount: 1470.0,
      description: "Advance on INV-003",
      date: "2024-01-08",
      txHash: "0xabcd...efgh",
    },
    {
      id: "TXN-003",
      type: "withdrawal",
      amount: -500.0,
      description: "Withdrawal to bank",
      date: "2024-01-05",
      txHash: "0x9876...5432",
    },
  ],
}

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "escrowed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "active":
        return "bg-primary/10 text-primary"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">StableWage</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="text-foreground font-medium">
                  Dashboard
                </Link>
                <Link href="/invoices" className="text-muted-foreground hover:text-foreground">
                  Invoices
                </Link>
                <Link href="/advances" className="text-muted-foreground hover:text-foreground">
                  Advances
                </Link>
                <Link href="/transactions" className="text-muted-foreground hover:text-foreground">
                  Transactions
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockData.user.avatar || "/placeholder.svg"} alt={mockData.user.name} />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {mockData.user.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your freelance business today.</p>
        </div>

        {/* Balance Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${mockData.balance.available.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Ready to withdraw</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${mockData.balance.pending.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Awaiting client payment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Escrowed Funds</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${mockData.balance.escrowed.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Secured in escrow</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your freelance business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" asChild>
                <Link href="/invoices/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Invoice
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/advances/request">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Request Advance
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/withdraw">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Withdraw Funds
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Advances</CardTitle>
              <CardDescription>Your current advance funding status</CardDescription>
            </CardHeader>
            <CardContent>
              {mockData.advances.length > 0 ? (
                <div className="space-y-4">
                  {mockData.advances.map((advance) => (
                    <div
                      key={advance.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">${advance.amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          Invoice {advance.invoiceId} • Fee: ${advance.fee.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">Repayment: {advance.repaymentDate}</p>
                      </div>
                      <Badge className={getStatusColor(advance.status)}>{advance.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No active advances</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/advances/request">Request Advance</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your latest invoice activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-foreground">{invoice.client}</p>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{invoice.description}</p>
                      <p className="text-sm font-medium text-foreground">${invoice.amount.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.status === "pending"
                          ? `Due: ${invoice.dueDate}`
                          : invoice.status === "paid"
                            ? `Paid: ${invoice.paidDate}`
                            : `Escrowed: ${invoice.escrowDate}`}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/invoices">View All Invoices</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest payment activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                        }`}
                      >
                        {transaction.amount > 0 ? (
                          <ArrowDownRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        <p className="text-xs text-muted-foreground font-mono">{transaction.txHash}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          transaction.amount > 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/transactions">View All Transactions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
