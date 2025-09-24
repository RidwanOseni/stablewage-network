"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, DollarSign, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { ConnectWallet } from "@/components/ConnectWallet";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          <Link href="#" className="font-bold" prefetch={false}>
            StableWage
          </Link>
          <nav className="hidden gap-6 text-sm sm:flex">
            <Link href="#features" prefetch={false}>Features</Link>
            <Link href="#how-it-works" prefetch={false}>How it Works</Link>
            <Link href="#waitlist" prefetch={false}>Pricing</Link>
          </nav>
          <ConnectWallet />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="inline-flex items-center">Instant Stablecoin Payroll</Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                The Future of Freelance Payments
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Instant stablecoin payroll, smart invoicing, and escrow-backed advances. Get paid faster,
                work with confidence.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button size="lg">Join Waitlist</Button>
                <Button variant="outline" size="lg">Watch Demo</Button>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Badge variant="secondary">Bank-grade Security</Badge>
                <Badge variant="secondary">Instant Settlements</Badge>
                <Badge variant="secondary">1000+ Users</Badge>
              </div>
            </div>
            <div className="w-full h-56 md:h-72 lg:h-80 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
              StableWage Demo
            </div>
          </div>
    </section>
        {/* Features Section */}
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need for modern payroll</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Built for freelancers and employers who demand speed, security, and transparency
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader>
              <DollarSign className="w-8 h-8 text-primary" />
              <CardTitle>Instant Payroll</CardTitle>
              <CardDescription>
                Get paid in stablecoins instantly. No more waiting for bank transfers or dealing with currency
                volatility.
              </CardDescription>
            </CardHeader>
            <Link href="#" className="px-6 pb-4 text-sm font-medium text-primary hover:underline" prefetch={false}>
              Learn More
              <ArrowRight className="w-4 h-4 inline-block ml-1" />
            </Link>
          </Card>
          <Card>
            <CardHeader>
              <CheckCircle className="w-8 h-8 text-primary" />
              <CardTitle>Smart Invoicing</CardTitle>
              <CardDescription>
                Create professional invoices with built-in escrow protection and automated payment tracking.
              </CardDescription>
            </CardHeader>
            <Link href="#" className="px-6 pb-4 text-sm font-medium text-primary hover:underline" prefetch={false}>
              Learn More
              <ArrowRight className="w-4 h-4 inline-block ml-1" />
            </Link>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="w-8 h-8 text-primary" />
              <CardTitle>Escrow Advances</CardTitle>
              <CardDescription>
                Get up to 70% of your invoice value upfront with our secure escrow-backed advance system.
              </CardDescription>
            </CardHeader>
            <Link href="#" className="px-6 pb-4 text-sm font-medium text-primary hover:underline" prefetch={false}>
              Learn More
              <ArrowRight className="w-4 h-4 inline-block ml-1" />
            </Link>
          </Card>
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How StableWage Works</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Simple, secure, and transparent payment process
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-3 lg:gap-12 relative">
          {/* Line connector - simplified visualization */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
          
          {/* Step 1 */}
          <Card className="relative z-10 p-6 text-center">
            <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full mx-auto mb-4 font-bold">1</div>
            <CardTitle>Create Invoice</CardTitle>
            <CardDescription>
              Generate professional invoices with smart contract integration for automatic escrow protection.
            </CardDescription>
          </Card>

          {/* Step 2 */}
          <Card className="relative z-10 p-6 text-center">
            <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full mx-auto mb-4 font-bold">2</div>
            <CardTitle>Get Advance</CardTitle>
            <CardDescription>
              Request up to 70% of your invoice value instantly with our LTV-based advance system.
            </CardDescription>
          </Card>

          {/* Step 3 */}
          <Card className="relative z-10 p-6 text-center">
            <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full mx-auto mb-4 font-bold">3</div>
            <CardTitle>Instant Payment</CardTitle>
            <CardDescription>
              Receive payments in stablecoins instantly when clients pay, with automatic advance settlement.
            </CardDescription>
          </Card>
        </div>
      </div>
    </section>

    {/* Waitlist Section */}
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join the Waitlist</h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Be among the first to experience the future of freelance payments. Get early access and exclusive
            benefits.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
            <Button type="submit">Join Waitlist</Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <Badge variant="secondary">No spam, ever</Badge>
            <Badge variant="secondary" className="ml-2">Early access</Badge>
            <Badge variant="secondary" className="ml-2">Exclusive benefits</Badge>
          </p>
        </div>
      </div>
    </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex flex-col items-start">
          <p className="text-lg font-bold">StableWage</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            The future of freelance payments, built on blockchain technology.
          </p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-1">Product</h4>
            <ul className="space-y-1 text-gray-500 dark:text-gray-400">
              <li><Link href="#" prefetch={false}>Features</Link></li>
              <li><Link href="#" prefetch={false}>Pricing</Link></li>
              <li><Link href="#" prefetch={false}>Security</Link></li>
              <li><Link href="#" prefetch={false}>API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Company</h4>
            <ul className="space-y-1 text-gray-500 dark:text-gray-400">
              <li><Link href="#" prefetch={false}>About</Link></li>
              <li><Link href="#" prefetch={false}>Blog</Link></li>
              <li><Link href="#" prefetch={false}>Careers</Link></li>
              <li><Link href="#" prefetch={false}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Legal</h4>
            <ul className="space-y-1 text-gray-500 dark:text-gray-400">
              <li><Link href="#" prefetch={false}>Privacy</Link></li>
              <li><Link href="#" prefetch={false}>Terms</Link></li>
              <li><Link href="#" prefetch={false}>Compliance</Link></li>
            </ul>
          </div>
        </nav>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 sm:mt-0 sm:self-end">
          © 2024 StableWage Network. All rights reserved.
        </p>
      </footer>
    </div>
  );
}