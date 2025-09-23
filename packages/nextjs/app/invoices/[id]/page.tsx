"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  MoreHorizontal,
  Send,
  Download,
  Copy,
  CreditCard,
  Shield,
  TrendingUp,
  ExternalLink,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

async function markInvoicePaid() {
  await fetch("/api/invoices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: mockInvoice.id, status: "paid" }),
  })
}

// Mock invoice data (in real app, would fetch by ID)
const mockInvoice = {
  id: "INV-001",
  number: "2024-001",
  client: "TechCorp Inc",
  clientEmail: "billing@techcorp.com",
  clientAddress: "123 Tech Street\nSan Francisco, CA 94105\nUnited States",
  amount: 1200.0,
  status: "pending",
  createdDate: "2024-01-10",
  dueDate: "2024-01-15",
  description: "Website Development - Phase 1",
  notes: "Payment due within 15 days. Late fees may apply after due date.",
  paymentTerms: "net-15",
  items: [
    { description: "Frontend Development", quantity: 40, rate: 25, amount: 1000 },
    { description: "UI/UX Design", quantity: 8, rate: 25, amount: 200 },
  ],
  subtotal: 1200,
  tax: 0,
  total: 1200,
  paymentMethods: ["stablecoin", "bank-transfer", "escrow"],
  advanceEligible: true,
  maxAdvance: 840, // 70% of total
  advanceFee: 8.4, // 1% of advance
}

export default function InvoiceDetailPage() {
  const params = useParams()
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

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

  const handlePayment = (method: string) => {
    setPaymentMethod(method)
    console.log(`Processing payment via ${method}`)
    // In real app, would integrate with payment processor
    // Mock: mark as paid
    markInvoicePaid()
  }

  const handleRequestAdvance = () => {
    console.log("Requesting advance")
    // In real app, would open advance request modal
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/invoices" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Invoices
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">Invoice {mockInvoice.number}</h1>
                <p className="text-sm text-muted-foreground">{mockInvoice.client}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(mockInvoice.status)}>{mockInvoice.status}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4 mr-2" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Send className="w-4 h-4 mr-2" />
                    Send Reminder
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate Invoice
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Share Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Invoice Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">From:</h3>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">Alex Johnson</p>
                      <p>Freelance Developer</p>
                      <p>alex@example.com</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">To:</h3>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">{mockInvoice.client}</p>
                      <p>{mockInvoice.clientEmail}</p>
                      <div className="whitespace-pre-line">{mockInvoice.clientAddress}</div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Invoice Number:</p>
                    <p className="font-medium text-foreground">{mockInvoice.number}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Issue Date:</p>
                    <p className="font-medium text-foreground">{mockInvoice.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date:</p>
                    <p className="font-medium text-foreground">{mockInvoice.dueDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items & Services</CardTitle>
                <CardDescription>{mockInvoice.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInvoice.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 text-sm">
                      <div className="col-span-6">
                        <p className="font-medium text-foreground">{item.description}</p>
                      </div>
                      <div className="col-span-2 text-center">
                        <p className="text-muted-foreground">{item.quantity}</p>
                      </div>
                      <div className="col-span-2 text-center">
                        <p className="text-muted-foreground">${item.rate.toFixed(2)}</p>
                      </div>
                      <div className="col-span-2 text-right">
                        <p className="font-medium text-foreground">${item.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${mockInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  {mockInvoice.tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax:</span>
                      <span className="font-medium">${mockInvoice.tax.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                    <span>Total:</span>
                    <span>${mockInvoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {mockInvoice.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{mockInvoice.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Payment Options */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Options</CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full justify-start"
                    variant={paymentMethod === "stablecoin" ? "default" : "outline"}
                    onClick={() => handlePayment("stablecoin")}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay with Stablecoin
                    <Badge variant="secondary" className="ml-auto">
                      Instant
                    </Badge>
                  </Button>

                  <Button
                    className="w-full justify-start"
                    variant={paymentMethod === "escrow" ? "default" : "outline"}
                    onClick={() => handlePayment("escrow")}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Escrow Payment
                    <Badge variant="secondary" className="ml-auto">
                      Protected
                    </Badge>
                  </Button>

                  <Button
                    className="w-full justify-start"
                    variant={paymentMethod === "bank" ? "default" : "outline"}
                    onClick={() => handlePayment("bank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Bank Transfer
                    <Badge variant="outline" className="ml-auto">
                      2-3 days
                    </Badge>
                  </Button>
                </CardContent>
              </Card>

              {/* Advance Option */}
              {mockInvoice.advanceEligible && (
                <Card>
                  <CardHeader>
                    <CardTitle>Request Advance</CardTitle>
                    <CardDescription>Get paid before the client pays</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Max Advance (70%):</span>
                        <span className="font-medium">${mockInvoice.maxAdvance.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fee (1%):</span>
                        <span className="font-medium">${mockInvoice.advanceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium border-t border-border pt-2">
                        <span>Net Payout:</span>
                        <span>${(mockInvoice.maxAdvance - mockInvoice.advanceFee).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full" onClick={handleRequestAdvance}>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Request Advance
                    </Button>

                    <div className="text-xs text-muted-foreground">
                      <p>• Instant funding upon approval</p>
                      <p>• Automatic repayment when client pays</p>
                      <p>• No credit check required</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Status */}
              {paymentMethod && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Payment Processing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Your payment via {paymentMethod} is being processed. You will receive a confirmation shortly.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
