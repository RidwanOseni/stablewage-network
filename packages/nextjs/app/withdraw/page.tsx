"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowUpRight, Wallet, CreditCard, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function WithdrawPage() {
  const router = useRouter()
  const [withdrawalMethod, setWithdrawalMethod] = useState("")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Mock available balance
  const availableBalance = 2450.75
  const minimumWithdrawal = 10.0

  const withdrawalMethods = [
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      description: "Direct transfer to your bank account",
      fee: 2.5,
      processingTime: "1-3 business days",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "crypto-wallet",
      name: "Crypto Wallet",
      description: "Transfer to your crypto wallet",
      fee: 0.5,
      processingTime: "5-15 minutes",
      icon: <Wallet className="w-5 h-5" />,
    },
  ]

  const selectedMethod = withdrawalMethods.find((method) => method.id === withdrawalMethod)
  const withdrawalAmount = Number.parseFloat(amount) || 0
  const fee = selectedMethod ? selectedMethod.fee : 0
  const netAmount = withdrawalAmount - fee

  const handleWithdraw = async () => {
    if (!selectedMethod || withdrawalAmount < minimumWithdrawal || withdrawalAmount > availableBalance) {
      return
    }

    setIsProcessing(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsSuccess(true)

    // Auto redirect after success
    setTimeout(() => {
      router.push("/transactions")
    }, 3000)
  }

  const isValidAmount = withdrawalAmount >= minimumWithdrawal && withdrawalAmount <= availableBalance

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Withdrawal Initiated!</h3>
              <p className="text-muted-foreground mb-4">
                Your withdrawal of ${withdrawalAmount.toFixed(2)} has been initiated.
              </p>
              <p className="text-sm text-muted-foreground mb-6">Processing time: {selectedMethod?.processingTime}</p>
              <Button onClick={() => router.push("/transactions")} className="w-full">
                View Transaction History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-xl font-bold text-foreground">Withdraw Funds</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Available Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">${availableBalance.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Ready to withdraw</p>
            </CardContent>
          </Card>

          {/* Withdrawal Method */}
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Method</CardTitle>
              <CardDescription>Choose how you'd like to receive your funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {withdrawalMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    withdrawalMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setWithdrawalMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">${method.fee.toFixed(2)} fee</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{method.processingTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Withdrawal Amount */}
          {withdrawalMethod && (
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Amount</CardTitle>
                <CardDescription>Enter the amount you'd like to withdraw</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8"
                      min={minimumWithdrawal}
                      max={availableBalance}
                      step="0.01"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Minimum: ${minimumWithdrawal.toFixed(2)}</span>
                    <span>Maximum: ${availableBalance.toFixed(2)}</span>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setAmount((availableBalance * 0.25).toFixed(2))}>
                    25%
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setAmount((availableBalance * 0.5).toFixed(2))}>
                    50%
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setAmount((availableBalance * 0.75).toFixed(2))}>
                    75%
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setAmount(availableBalance.toFixed(2))}>
                    Max
                  </Button>
                </div>

                {/* Validation Messages */}
                {amount && !isValidAmount && (
                  <div className="flex items-center space-x-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      {withdrawalAmount < minimumWithdrawal
                        ? `Minimum withdrawal is $${minimumWithdrawal.toFixed(2)}`
                        : `Amount exceeds available balance`}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Withdrawal Summary */}
          {withdrawalMethod && amount && isValidAmount && (
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Withdrawal Amount:</span>
                  <span className="font-medium">${withdrawalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee:</span>
                  <span className="font-medium">-${fee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <span>Net Amount:</span>
                  <span className="text-primary">${netAmount.toFixed(2)}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Method: {selectedMethod?.name}</p>
                  <p>Processing Time: {selectedMethod?.processingTime}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleWithdraw}
            disabled={!withdrawalMethod || !amount || !isValidAmount || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Processing Withdrawal...
              </div>
            ) : (
              <>
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Withdraw ${netAmount.toFixed(2)}
              </>
            )}
          </Button>

          {/* Important Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Withdrawals are processed during business hours (Monday-Friday, 9 AM - 5 PM EST)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Bank transfers may take 1-3 business days to appear in your account</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Crypto withdrawals are typically processed within 15 minutes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>You'll receive an email confirmation once your withdrawal is processed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
