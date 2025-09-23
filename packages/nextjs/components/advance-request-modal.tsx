"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, TrendingUp, DollarSign, Calculator, CheckCircle } from "lucide-react"

interface EligibleInvoice {
  id: string
  number: string
  client: string
  amount: number
  status: string
  dueDate: string
  maxAdvance: number
  fee: number
}

interface AdvanceRequestModalProps {
  isOpen: boolean
  onClose: () => void
  eligibleInvoices: EligibleInvoice[]
}

export function AdvanceRequestModal({ isOpen, onClose, eligibleInvoices }: AdvanceRequestModalProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("")
  const [advancePercentage, setAdvancePercentage] = useState([70]) // Default 70%
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const selectedInvoice = eligibleInvoices.find((invoice) => invoice.id === selectedInvoiceId)

  // Calculate advance details
  const calculateAdvance = () => {
    if (!selectedInvoice) return { amount: 0, fee: 0, netPayout: 0 }

    const amount = (selectedInvoice.amount * advancePercentage[0]) / 100
    const fee = amount * 0.01 // 1% fee
    const netPayout = amount - fee

    return { amount, fee, netPayout }
  }

  const { amount: advanceAmount, fee, netPayout } = calculateAdvance()

  const handleSubmit = async () => {
    if (!selectedInvoice) return

    setIsSubmitting(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
      // Reset form
      setSelectedInvoiceId("")
      setAdvancePercentage([70])
    }, 2000)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false)
      onClose()
    }
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Advance Request Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Your advance request for ${advanceAmount.toFixed(2)} has been submitted for review.
            </p>
            <p className="text-sm text-muted-foreground">You'll receive the funds within 24 hours upon approval.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Request Advance
          </DialogTitle>
          <DialogDescription>Get instant funding against your pending invoices</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Selection */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="invoice-select">Select Invoice</Label>
              <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an eligible invoice" />
                </SelectTrigger>
                <SelectContent>
                  {eligibleInvoices.map((invoice) => (
                    <SelectItem key={invoice.id} value={invoice.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {invoice.number} - {invoice.client}
                        </span>
                        <span className="ml-2 text-muted-foreground">${invoice.amount.toFixed(2)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedInvoice && (
              <Card>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Client:</p>
                      <p className="font-medium">{selectedInvoice.client}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Invoice Amount:</p>
                      <p className="font-medium">${selectedInvoice.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Due Date:</p>
                      <p className="font-medium">{selectedInvoice.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status:</p>
                      <Badge variant="secondary">{selectedInvoice.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Advance Amount Selection */}
          {selectedInvoice && (
            <div className="space-y-4">
              <div>
                <Label>Advance Percentage</Label>
                <div className="mt-4 space-y-4">
                  <Slider
                    value={advancePercentage}
                    onValueChange={setAdvancePercentage}
                    max={70}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>10%</span>
                    <span className="font-medium text-foreground">{advancePercentage[0]}%</span>
                    <span>70% (Max)</span>
                  </div>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Calculator className="w-4 h-4 mr-2" />
                    Advance Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Invoice Amount:</span>
                    <span className="font-medium">${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Advance Percentage:</span>
                    <span className="font-medium">{advancePercentage[0]}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Advance Amount:</span>
                    <span className="font-medium">${advanceAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee (1%):</span>
                    <span className="font-medium">-${fee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-semibold">
                    <span>Net Payout:</span>
                    <span className="text-primary">${netPayout.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Terms & Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">•</span>
                      <span>Advance will be automatically repaid when the client pays the invoice</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">•</span>
                      <span>1% fee is deducted from the advance amount</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">•</span>
                      <span>No additional interest or hidden fees</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">•</span>
                      <span>Funds typically available within 24 hours of approval</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">•</span>
                      <span>Invoice must be paid by the due date to avoid penalties</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedInvoice || isSubmitting} className="min-w-[120px]">
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Request ${advanceAmount.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
