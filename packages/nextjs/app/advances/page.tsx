"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Plus, TrendingUp, Clock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdvanceRequestModal } from "@/components/advance-request-modal"

// Mock advance data
const mockAdvances = [
  {
    id: "ADV-001",
    invoiceId: "INV-003",
    invoiceNumber: "2024-003",
    client: "Enterprise Co",
    invoiceAmount: 2100.0,
    requestedAmount: 1470.0, // 70% LTV
    fee: 14.7, // 1% of advance
    netPayout: 1455.3,
    status: "active",
    requestDate: "2024-01-08",
    fundedDate: "2024-01-08",
    repaymentDate: "2024-01-25",
    daysRemaining: 17,
  },
  {
    id: "ADV-002",
    invoiceId: "INV-008",
    invoiceNumber: "2024-008",
    client: "SaaS Company",
    invoiceAmount: 2250.0,
    requestedAmount: 1575.0, // 70% LTV
    fee: 15.75, // 1% of advance
    netPayout: 1559.25,
    status: "pending",
    requestDate: "2024-01-12",
    fundedDate: null,
    repaymentDate: "2024-01-16",
    daysRemaining: 4,
  },
  {
    id: "ADV-003",
    invoiceId: "INV-007",
    invoiceNumber: "2024-007",
    client: "E-commerce Store",
    invoiceAmount: 1800.0,
    requestedAmount: 1260.0, // 70% LTV
    fee: 12.6, // 1% of advance
    netPayout: 1247.4,
    status: "repaid",
    requestDate: "2024-01-01",
    fundedDate: "2024-01-01",
    repaymentDate: "2024-01-08",
    repaidDate: "2024-01-07",
    daysRemaining: 0,
  },
]

// Mock eligible invoices for advance requests
const mockEligibleInvoices = [
  {
    id: "INV-001",
    number: "2024-001",
    client: "TechCorp Inc",
    amount: 1200.0,
    status: "pending",
    dueDate: "2024-01-15",
    maxAdvance: 840.0, // 70% LTV
    fee: 8.4, // 1% of advance
  },
  {
    id: "INV-005",
    number: "2024-005",
    client: "Tech Startup",
    amount: 1500.0,
    status: "sent",
    dueDate: "2024-01-18",
    maxAdvance: 1050.0, // 70% LTV
    fee: 10.5, // 1% of advance
  },
]

export default function AdvancesPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [showRequestModal, setShowRequestModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "repaid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <TrendingUp className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "repaid":
        return <CheckCircle className="w-4 h-4" />
      case "overdue":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredAdvances = mockAdvances.filter((advance) => statusFilter === "all" || advance.status === statusFilter)

  const totalAdvanced = mockAdvances
    .filter((advance) => advance.status === "active" || advance.status === "repaid")
    .reduce((sum, advance) => sum + advance.requestedAmount, 0)

  const activeAdvances = mockAdvances.filter((advance) => advance.status === "active")
  const totalActive = activeAdvances.reduce((sum, advance) => sum + advance.requestedAmount, 0)

  const totalRepaid = mockAdvances
    .filter((advance) => advance.status === "repaid")
    .reduce((sum, advance) => sum + advance.requestedAmount, 0)

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
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Advances</span>
              </div>
            </div>
            <Button onClick={() => setShowRequestModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Request Advance
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Advanced</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalAdvanced.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Lifetime advances</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Advances</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${totalActive.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{activeAdvances.length} active advances</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Repaid</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalRepaid.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Successfully repaid</p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How Advances Work</CardTitle>
            <CardDescription>Get paid instantly with our escrow-backed advance system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary">70%</span>
                </div>
                <h3 className="font-semibold mb-2">Loan-to-Value Ratio</h3>
                <p className="text-sm text-muted-foreground">
                  Get up to 70% of your invoice value instantly, secured by escrow protection.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary">1%</span>
                </div>
                <h3 className="font-semibold mb-2">Simple Fee Structure</h3>
                <p className="text-sm text-muted-foreground">
                  Only 1% fee on the advance amount. No hidden charges or complex interest rates.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Auto Repayment</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic repayment when your client pays the invoice. No manual intervention needed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advances List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Advances</CardTitle>
                <CardDescription>Track all your advance requests and repayments</CardDescription>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="repaid">Repaid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredAdvances.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Advance Amount</TableHead>
                    <TableHead>Net Payout</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Repayment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdvances.map((advance) => (
                    <TableRow key={advance.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{advance.invoiceNumber}</p>
                          <p className="text-sm text-muted-foreground">${advance.invoiceAmount.toFixed(2)} invoice</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-foreground">{advance.client}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">${advance.requestedAmount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Fee: ${advance.fee.toFixed(2)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-foreground">${advance.netPayout.toFixed(2)}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(advance.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(advance.status)}
                            {advance.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-foreground">
                            {advance.status === "repaid"
                              ? `Repaid: ${advance.repaidDate}`
                              : `Due: ${advance.repaymentDate}`}
                          </p>
                          {advance.status === "active" && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>{advance.daysRemaining} days left</span>
                                <span>{Math.round((advance.daysRemaining / 30) * 100)}%</span>
                              </div>
                              <Progress value={(advance.daysRemaining / 30) * 100} className="h-1" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No advances yet</h3>
                <p className="text-muted-foreground mb-4">
                  Request an advance against your pending invoices to get paid instantly.
                </p>
                <Button onClick={() => setShowRequestModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Request Your First Advance
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Advance Request Modal */}
      <AdvanceRequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        eligibleInvoices={mockEligibleInvoices}
      />
    </div>
  )
}
