"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ImportResult {
  total: number
  successful: number
  failed: number
  errors: Array<{
    row: number
    field: string
    message: string
  }>
}

export default function ImportInvoicesPage() {
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      setImportResult(null)
    }
  }

  const handleImport = async () => {
    if (!file) return

    setImporting(true)

    // Mock import process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock import result
    const mockResult: ImportResult = {
      total: 12,
      successful: 10,
      failed: 2,
      errors: [
        { row: 3, field: "amount", message: "Invalid amount format" },
        { row: 7, field: "clientEmail", message: "Invalid email address" },
      ],
    }

    setImportResult(mockResult)
    setImporting(false)
  }

  const downloadTemplate = () => {
    const csvContent = `Invoice Number,Client Name,Client Email,Amount,Currency,Due Date,Description,Item Description,Item Quantity,Item Rate
INV-2024-001,Acme Corp,billing@acme.com,5000,USDC,2024-02-15,Web Development,Frontend Development,40,75
INV-2024-002,TechStart Inc,finance@techstart.io,3500,USDC,2024-02-20,Mobile App,UI/UX Design,25,80`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "invoice-template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Import Invoices</h1>
        <p className="text-gray-600 mt-2">Upload a CSV file to import multiple invoices at once</p>
      </div>

      <div className="grid gap-6">
        {/* Template Download */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              CSV Template
            </CardTitle>
            <CardDescription>Download our CSV template to ensure your data is formatted correctly</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload CSV File
            </CardTitle>
            <CardDescription>Select a CSV file containing your invoice data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="csv-file">CSV File</Label>
              <Input id="csv-file" type="file" accept=".csv" onChange={handleFileSelect} className="mt-1" />
            </div>

            {file && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">{file.name}</span>
                <Badge variant="secondary" className="ml-auto">
                  {(file.size / 1024).toFixed(1)} KB
                </Badge>
              </div>
            )}

            <Button onClick={handleImport} disabled={!file || importing} className="w-full">
              {importing ? "Importing..." : "Import Invoices"}
            </Button>
          </CardContent>
        </Card>

        {/* Import Results */}
        {importResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {importResult.failed === 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                )}
                Import Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{importResult.total}</div>
                  <div className="text-sm text-blue-800">Total Records</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{importResult.successful}</div>
                  <div className="text-sm text-green-800">Successful</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{importResult.failed}</div>
                  <div className="text-sm text-red-800">Failed</div>
                </div>
              </div>

              {importResult.errors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Errors:</h4>
                  <div className="space-y-2">
                    {importResult.errors.map((error, index) => (
                      <Alert key={index} variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Row {error.row}, {error.field}: {error.message}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}

              {importResult.successful > 0 && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Successfully imported {importResult.successful} invoices. You can view them in your{" "}
                    <a href="/invoices" className="underline">
                      invoices list
                    </a>
                    .
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
