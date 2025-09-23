import { NextResponse } from "next/server"

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
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json({
    success: true,
    data: mockInvoices,
    total: mockInvoices.length,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Update existing invoice status if id provided
  if (body.id) {
    const idx = mockInvoices.findIndex((i) => i.id === body.id)
    if (idx !== -1) {
      const updated = {
        ...mockInvoices[idx],
        status: body.status ?? mockInvoices[idx].status,
        paidDate: body.status === "paid" ? new Date().toISOString().split("T")[0] : mockInvoices[idx].paidDate,
      }
      mockInvoices[idx] = updated as any
      await new Promise((resolve) => setTimeout(resolve, 300))
      return NextResponse.json({ success: true, data: updated, message: "Invoice updated" })
    }
  }

  // Simulate creating a new invoice
  const newInvoice = {
    id: `INV-${String(mockInvoices.length + 1).padStart(3, "0")}`,
    ...body,
    createdDate: new Date().toISOString().split("T")[0],
  }

  mockInvoices.push(newInvoice)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    data: newInvoice,
    message: "Invoice created successfully",
  })
}
