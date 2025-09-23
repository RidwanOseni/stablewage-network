"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, Save, Send, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

export default function CreateInvoicePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    invoiceNumber: `2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    description: "",
    notes: "",
    paymentTerms: "net-15",
  })

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    setItems((prev) => [...prev, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleSave = async (status: "draft" | "sent") => {
    const invoiceData = {
      ...formData,
      items,
      subtotal,
      tax,
      total,
      status,
    }

    console.log("Saving invoice:", invoiceData)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to invoices list
    router.push("/invoices")
  }

  const handlePreview = () => {
    // In a real app, this would open a preview modal or new tab
    console.log("Preview invoice")
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
              <h1 className="text-xl font-bold text-foreground">Create Invoice</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={() => handleSave("draft")}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => handleSave("sent")}>
                <Send className="w-4 h-4 mr-2" />
                Send Invoice
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Invoice Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Enter your client's details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange("clientName", e.target.value)}
                      placeholder="Company or Individual Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Client Email *</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                      placeholder="client@company.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientAddress">Client Address</Label>
                  <Textarea
                    id="clientAddress"
                    value={formData.clientAddress}
                    onChange={(e) => handleInputChange("clientAddress", e.target.value)}
                    placeholder="Client's billing address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Invoice Details */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>Set invoice number, dates, and terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) => handleInputChange("paymentTerms", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
                        <SelectItem value="net-15">Net 15 Days</SelectItem>
                        <SelectItem value="net-30">Net 30 Days</SelectItem>
                        <SelectItem value="net-60">Net 60 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => handleInputChange("issueDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange("dueDate", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of the work"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Line Items</CardTitle>
                    <CardDescription>Add items or services to your invoice</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={addItem}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-12 md:col-span-5 space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                        placeholder="Item description"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2 space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2 space-y-2">
                      <Label>Rate ($)</Label>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2 space-y-2">
                      <Label>Amount</Label>
                      <div className="text-sm font-medium text-foreground py-2">${item.amount.toFixed(2)}</div>
                    </div>
                    <div className="col-span-1 md:col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>Add any additional information or terms</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Payment instructions, terms, or other notes..."
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Invoice Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%):</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Total:</span>
                      <span className="font-bold text-lg text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground">Payment Options</h4>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="w-full justify-center">
                      Stablecoin Payment
                    </Badge>
                    <Badge variant="outline" className="w-full justify-center">
                      Bank Transfer
                    </Badge>
                    <Badge variant="outline" className="w-full justify-center">
                      Escrow Protection
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground">Advance Eligible</h4>
                  <p className="text-sm text-muted-foreground">Up to ${(total * 0.7).toFixed(2)} (70% LTV)</p>
                  <p className="text-xs text-muted-foreground">Fee: ${(total * 0.7 * 0.01).toFixed(2)} (1%)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
