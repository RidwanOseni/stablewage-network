import { NextResponse } from "next/server"

// Mock advance data
const mockAdvances = [
  {
    id: "ADV-001",
    invoiceId: "INV-003",
    invoiceNumber: "2024-003",
    client: "Enterprise Co",
    invoiceAmount: 2100.0,
    requestedAmount: 1470.0,
    fee: 14.7,
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
    requestedAmount: 1575.0,
    fee: 15.75,
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
    requestedAmount: 1260.0,
    fee: 12.6,
    netPayout: 1247.4,
    status: "repaid",
    requestDate: "2024-01-01",
    fundedDate: "2024-01-01",
    repaymentDate: "2024-01-08",
    repaidDate: "2024-01-07",
    daysRemaining: 0,
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json({
    success: true,
    data: mockAdvances,
    total: mockAdvances.length,
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Calculate advance details
  const invoiceAmount = body.invoiceAmount
  const percentage = body.percentage || 70
  const requestedAmount = (invoiceAmount * percentage) / 100
  const fee = requestedAmount * 0.01 // 1% fee
  const netPayout = requestedAmount - fee

  // Simulate creating a new advance
  const newAdvance = {
    id: `ADV-${String(mockAdvances.length + 1).padStart(3, "0")}`,
    invoiceId: body.invoiceId,
    invoiceNumber: body.invoiceNumber,
    client: body.client,
    invoiceAmount,
    requestedAmount,
    fee,
    netPayout,
    status: "pending",
    requestDate: new Date().toISOString().split("T")[0],
    fundedDate: null,
    repaymentDate: body.repaymentDate,
    daysRemaining: Math.ceil((new Date(body.repaymentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
  }

  mockAdvances.push(newAdvance)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json({
    success: true,
    data: newAdvance,
    message: "Advance request submitted successfully",
  })
}
