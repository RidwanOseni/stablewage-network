"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { FileUpload } from "@/components/file-upload"

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userType = searchParams.get("type") as "freelancer" | "employer"
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Profile info
    bio: "",
    skills: "",
    hourlyRate: "",
    experience: "",
    portfolio: "",
    // Business info (employer)
    businessType: "",
    employeeCount: "",
    industry: "",
    // KYC info
    dateOfBirth: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    // Documents
    idDocument: null as File | null,
    proofOfAddress: null as File | null,
    businessRegistration: null as File | null,
  })

  const totalSteps = userType === "freelancer" ? 3 : 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      handleComplete()
    }
  }

  const handleComplete = async () => {
    // Mock API call
    console.log("Completing onboarding:", formData)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Mark KYC complete and route to role dashboard
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", kycComplete: true }),
    })
    router.push("/dashboard")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Tell us about yourself to personalize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userType === "freelancer" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Describe your professional background and expertise..."
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      placeholder="React, TypeScript, Node.js, Design..."
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="50"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select onValueChange={(value) => handleInputChange("experience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-5">2-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio URL (optional)</Label>
                    <Input
                      id="portfolio"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange("portfolio", e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select onValueChange={(value) => handleInputChange("businessType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="small-business">Small Business</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="agency">Agency</SelectItem>
                        <SelectItem value="nonprofit">Non-profit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Number of Employees</Label>
                    <Select onValueChange={(value) => handleInputChange("employeeCount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201-1000">201-1000</SelectItem>
                        <SelectItem value="1000+">1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>We need this information for KYC compliance and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
              <CardDescription>Upload required documents for identity verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Government-issued ID</Label>
                <FileUpload
                  onFileSelect={(file) => handleFileUpload("idDocument", file)}
                  accept="image/*,.pdf"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
                {formData.idDocument && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {formData.idDocument.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Proof of Address</Label>
                <FileUpload
                  onFileSelect={(file) => handleFileUpload("proofOfAddress", file)}
                  accept="image/*,.pdf"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
                {formData.proofOfAddress && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {formData.proofOfAddress.name}
                  </div>
                )}
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Document Requirements:</p>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>• Documents must be clear and readable</li>
                      <li>• Accepted formats: JPG, PNG, PDF</li>
                      <li>• Maximum file size: 5MB</li>
                      <li>• Documents must be valid and not expired</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4: // Only for employers
        return (
          <Card>
            <CardHeader>
              <CardTitle>Business Verification</CardTitle>
              <CardDescription>Additional documents required for business accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Business Registration Document</Label>
                <FileUpload
                  onFileSelect={(file) => handleFileUpload("businessRegistration", file)}
                  accept="image/*,.pdf"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
                {formData.businessRegistration && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {formData.businessRegistration.name}
                  </div>
                )}
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Business Document Requirements:</p>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>• Certificate of Incorporation</li>
                      <li>• Business License</li>
                      <li>• Tax Registration Certificate</li>
                      <li>• Any one of the above documents is sufficient</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Invalid onboarding link</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              {userType === "freelancer" ? "Freelancer" : "Employer"} Onboarding
            </h1>
            <Badge variant="secondary">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-muted-foreground">Complete your profile to start using StableWage</p>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === totalSteps ? "Complete Setup" : "Next"}
            {currentStep < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
