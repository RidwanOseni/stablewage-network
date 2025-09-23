"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Plus, Search, Filter, MoreHorizontal, Eye, Send, Download, Copy, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock invoice data
const mockInvoices = [
  {
    id: "INV-001",
    number: "2024-001",
    client: "TechCorp Inc",
    clientEmail: "billing@techcorp.com",
    amount: 1200.0,
    status: "pending",
    createdDate: "2024-01-10",
    dueDate: "2024-01-15",
    description: "Website Development - Phase 1",
    items: [
      { description: "Frontend Development", quantity: 40, rate: 25, amount: 1000 },
      { description: "UI/UX Design", quantity: 8, rate: 25, amount: 200 },
    ],
  },
  {
    id: "INV-002",
    number: "2024-002",
    client: "StartupXYZ",
    clientEmail: "finance@startupxyz.com",
    amount: 850.0,
    status: "paid",
    createdDate: "2024-01-05",
    dueDate: "2024-01-10",
    paidDate: "2024-01-10",
    description: "Mobile App Design",
    items: [{ description: "Mobile App Design", quantity: 34, rate: 25, amount: 850 }],
  },
  {
    id: "INV-003",
    number: "2024-003",
    client: "Enterprise Co",
    clientEmail: "payments@enterprise.co",
    amount: 2100.0,
    status: "escrowed",
    createdDate: "2024-01-08",
    dueDate: "2024-01-25",
    escrowDate: "2024-01-08",
    description: "Full Stack Development",
    items: [
      { description: "Backend API Development", quantity: 50, rate: 30, amount: 1500 },
      { description: "Database Design", quantity: 20, rate: 30, amount: 600 },
    ],
  },
  {
    id: "INV-004",
    number: "2024-004",
    client: "Creative Agency",
    clientEmail: "billing@creative.agency",
    amount: 750.0,
    status: "draft",
    createdDate: "2024-01-12",
    dueDate: "2024-01-20",
    description: "Brand Identity Design",
    items: [
      { description: "Logo Design", quantity: 15, rate: 35, amount: 525 },
      { description: "Brand Guidelines", quantity: 9, rate: 25, amount: 225 },
    ],
  },
  {
    id: "INV-005",
    number: "2024-005",
    client: "Tech Startup",
    clientEmail: "admin@techstartup.io",
    amount: 1500.0,
    status: "sent",
    createdDate: "2024-01-11",
    dueDate: "2024-01-18",
    sentDate: "2024-01-11",
    description: "React Development",
    items: [{ description: "React Component Development", quantity: 60, rate: 25, amount: 1500 }],
  },
  {
    id: "INV-006",
    number: "2024-006",
    client: "Digital Marketing Co",
    clientEmail: "finance@digitalmarketing.co",
    amount: 950.0,
    status: "overdue",
    createdDate: "2023-12-20",
    dueDate: "2023-12-30",
    description: "Website Optimization",
    items: [
      { description: "SEO Optimization", quantity: 25, rate: 30, amount: 750 },
      { description: "Performance Audit", quantity: 8, rate: 25, amount: 200 },
    ],
  },
  {
    id: "INV-007",
    number: "2024-007",
    client: "E-commerce Store",
    clientEmail: "billing@ecommerce.store",
    amount: 1800.0,
    status: "paid",
    createdDate: "2024-01-01",
    dueDate: "2024-01-08",
    paidDate: "2024-01-07",
    description: "E-commerce Platform Development",
    items: [
      { description: "Shopping Cart Development", quantity: 40, rate: 35, amount: 1400 },
      { description: "Payment Integration", quantity: 16, rate: 25, amount: 400 },
    ],
  },
  {
    id: "INV-008",
    number: "2024-008",
    client: "SaaS Company",
    clientEmail: "accounting@saas.company",
    amount: 2250.0,
    status: "pending",
    createdDate: "2024-01-09",
    dueDate: "2024-01-16",
    description: "Dashboard Development",
    items: [
      { description: "Admin Dashboard", quantity: 50, rate: 35, amount: 1750 },
      { description: "Analytics Integration", quantity: 20, rate: 25, amount: 500 },
    ],
  },
]

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "sent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "escrowed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredInvoices = mockInvoices
    .filter((invoice) => {
      const matchesSearch =
        invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.amount - a.amount
        case "client":
          return a.client.localeCompare(b.client)
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      }
    })

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = filteredInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = filteredInvoices
    .filter((invoice) => ["pending", "sent", "escrowed"].includes(invoice.status))
    .reduce((sum, invoice) => sum + invoice.amount, 0)

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
                  <DollarSign className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Invoices</span>
              </div>
            </div>
            <Button asChild>
              <Link href="/invoices/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
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
              <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{filteredInvoices.length} invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${paidAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {filteredInvoices.filter((i) => i.status === "paid").length} invoices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {filteredInvoices.filter((i) => ["pending", "sent", "escrowed"].includes(i.status)).length} invoices
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Invoice Management</CardTitle>
            <CardDescription>Manage and track all your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="escrowed">Escrowed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Created</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{invoice.number}</p>
                        <p className="text-sm text-muted-foreground">{invoice.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{invoice.client}</p>
                        <p className="text-sm text-muted-foreground">{invoice.clientEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground">${invoice.amount.toFixed(2)}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">{invoice.dueDate}</p>
                      {invoice.status === "overdue" && <p className="text-xs text-red-600">Overdue</p>}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/invoices/${invoice.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {invoice.status === "draft" && (
                            <DropdownMenuItem>
                              <Send className="w-4 h-4 mr-2" />
                              Send Invoice
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
