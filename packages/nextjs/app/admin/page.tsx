"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

const mockUsers = [
  { id: "U-001", email: "alex@example.com", role: "freelancer", kycComplete: true },
  { id: "U-002", email: "cfo@techcorp.com", role: "employer", kycComplete: true },
]

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Admin Overview</h1>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>KYC</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.id}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>{u.kycComplete ? "Complete" : "Pending"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoices & Advances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <Link href="/invoices" className="text-primary underline">View Invoices</Link>
                <div>Advances: see Advances page in app</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

