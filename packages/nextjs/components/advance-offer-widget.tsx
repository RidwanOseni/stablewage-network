"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Clock } from "lucide-react"

interface AdvanceOfferWidgetProps {
  invoiceAmount: number
  ltvPercentage?: number
  feePercentage?: number
  onRequestAdvance?: () => void
  className?: string
}

export function AdvanceOfferWidget({
  invoiceAmount,
  ltvPercentage = 70,
  feePercentage = 1,
  onRequestAdvance,
  className,
}: AdvanceOfferWidgetProps) {
  const maxAdvance = (invoiceAmount * ltvPercentage) / 100
  const fee = maxAdvance * (feePercentage / 100)
  const netPayout = maxAdvance - fee

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center text-base">
          <TrendingUp className="w-4 h-4 mr-2" />
          Advance Available
        </CardTitle>
        <CardDescription>Get instant funding against this invoice</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Invoice Amount:</span>
            <span className="font-medium">${invoiceAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Max Advance ({ltvPercentage}%):</span>
            <span className="font-medium">${maxAdvance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee ({feePercentage}%):</span>
            <span className="font-medium">-${fee.toFixed(2)}</span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex justify-between">
              <span className="font-medium">Net Payout:</span>
              <span className="font-bold text-primary">${netPayout.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            24h funding
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <DollarSign className="w-3 h-3 mr-1" />
            Auto repayment
          </Badge>
        </div>

        {onRequestAdvance && (
          <Button onClick={onRequestAdvance} className="w-full">
            <TrendingUp className="w-4 h-4 mr-2" />
            Request Advance
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
