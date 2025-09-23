"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AdvanceRequestModal } from "@/components/advance-request-modal"

// Mock eligible invoices
const mockEligibleInvoices = [
  {
    id: "INV-001",
    number: "2024-001",
    client: "TechCorp Inc",
    amount: 1200.0,
    status: "pending",
    dueDate: "2024-01-15",
    maxAdvance: 840.0,
    fee: 8.4,
  },
  {
    id: "INV-005",
    number: "2024-005",
    client: "Tech Startup",
    amount: 1500.0,
    status: "sent",
    dueDate: "2024-01-18",
    maxAdvance: 1050.0,
    fee: 10.5,
  },
]

export default function RequestAdvancePage() {
  const [showModal, setShowModal] = useState(true)

  const handleClose = () => {
    setShowModal(false)
    // Redirect back to advances page
    window.location.href = "/advances"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/advances" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Advances
              </Link>
              <h1 className="text-xl font-bold text-foreground">Request Advance</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Request Advance</CardTitle>
            <CardDescription>Get instant funding against your pending invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The advance request form will open automatically. If it doesn't appear, click the button below.
            </p>
            <Button onClick={() => setShowModal(true)} className="mt-4">
              Open Advance Request
            </Button>
          </CardContent>
        </Card>
      </div>

      <AdvanceRequestModal isOpen={showModal} onClose={handleClose} eligibleInvoices={mockEligibleInvoices} />
    </div>
  )
}
