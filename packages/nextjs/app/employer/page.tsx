"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { DollarSign, Plus, ArrowLeft } from "lucide-react"

export default function EmployerDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Employer</span>
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
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Create and manage invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/invoices/create">Create Invoice</Link>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/invoices">View Sent Invoices</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
              <CardDescription>Pay invoices and track status</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/invoices">Go to Invoices</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

