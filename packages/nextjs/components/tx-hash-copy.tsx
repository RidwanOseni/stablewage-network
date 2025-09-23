"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface TxHashCopyProps {
  txHash: string
  className?: string
  showFullHash?: boolean
}

export function TxHashCopy({ txHash, className, showFullHash = false }: TxHashCopyProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(txHash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy transaction hash:", err)
    }
  }

  const displayHash = showFullHash ? txHash : `${txHash.slice(0, 10)}...${txHash.slice(-8)}`

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{displayHash}</code>
      <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-6 w-6 p-0" title="Copy transaction hash">
        {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
      </Button>
    </div>
  )
}
