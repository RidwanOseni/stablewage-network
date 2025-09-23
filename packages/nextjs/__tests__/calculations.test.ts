import { describe, it, expect } from "@jest/globals"
import {
  calculateAdvanceAmount,
  calculateProcessingFee,
  calculateNetPayout,
  calculateAdvanceOffer,
} from "../lib/calculations"

describe("Advance Calculations", () => {
  describe("calculateAdvanceAmount", () => {
    it("should calculate 70% LTV correctly", () => {
      expect(calculateAdvanceAmount(5000, 0.7)).toBe(3500)
      expect(calculateAdvanceAmount(10000, 0.7)).toBe(7000)
      expect(calculateAdvanceAmount(1000, 0.7)).toBe(700)
    })

    it("should handle different LTV ratios", () => {
      expect(calculateAdvanceAmount(5000, 0.5)).toBe(2500)
      expect(calculateAdvanceAmount(5000, 0.8)).toBe(4000)
      expect(calculateAdvanceAmount(5000, 0.9)).toBe(4500)
    })

    it("should round down to 2 decimal places", () => {
      expect(calculateAdvanceAmount(3333, 0.7)).toBe(2333.1)
      expect(calculateAdvanceAmount(1234.56, 0.7)).toBe(864.19)
    })

    it("should throw error for invalid invoice amount", () => {
      expect(() => calculateAdvanceAmount(0, 0.7)).toThrow("Invoice amount must be greater than 0")
      expect(() => calculateAdvanceAmount(-100, 0.7)).toThrow("Invoice amount must be greater than 0")
    })

    it("should throw error for invalid LTV ratio", () => {
      expect(() => calculateAdvanceAmount(5000, 0)).toThrow("LTV ratio must be between 0 and 1")
      expect(() => calculateAdvanceAmount(5000, 1.1)).toThrow("LTV ratio must be between 0 and 1")
      expect(() => calculateAdvanceAmount(5000, -0.1)).toThrow("LTV ratio must be between 0 and 1")
    })
  })

  describe("calculateProcessingFee", () => {
    it("should calculate 1% fee correctly", () => {
      expect(calculateProcessingFee(3500, 0.01)).toBe(35)
      expect(calculateProcessingFee(7000, 0.01)).toBe(70)
      expect(calculateProcessingFee(1000, 0.01)).toBe(10)
    })

    it("should handle different fee rates", () => {
      expect(calculateProcessingFee(5000, 0.005)).toBe(25) // 0.5%
      expect(calculateProcessingFee(5000, 0.02)).toBe(100) // 2%
      expect(calculateProcessingFee(5000, 0.015)).toBe(75) // 1.5%
    })

    it("should round up to 2 decimal places", () => {
      expect(calculateProcessingFee(3333, 0.01)).toBe(33.33)
      expect(calculateProcessingFee(1234.56, 0.01)).toBe(12.35)
    })

    it("should throw error for invalid advance amount", () => {
      expect(() => calculateProcessingFee(0, 0.01)).toThrow("Advance amount must be greater than 0")
      expect(() => calculateProcessingFee(-100, 0.01)).toThrow("Advance amount must be greater than 0")
    })

    it("should throw error for invalid fee rate", () => {
      expect(() => calculateProcessingFee(5000, -0.01)).toThrow("Fee rate must be between 0 and 1")
      expect(() => calculateProcessingFee(5000, 1.1)).toThrow("Fee rate must be between 0 and 1")
    })
  })

  describe("calculateNetPayout", () => {
    it("should calculate net payout correctly", () => {
      expect(calculateNetPayout(3500, 0.01)).toBe(3465) // 3500 - 35
      expect(calculateNetPayout(7000, 0.01)).toBe(6930) // 7000 - 70
      expect(calculateNetPayout(1000, 0.01)).toBe(990) // 1000 - 10
    })

    it("should handle different fee rates", () => {
      expect(calculateNetPayout(5000, 0.005)).toBe(4975) // 5000 - 25
      expect(calculateNetPayout(5000, 0.02)).toBe(4900) // 5000 - 100
    })
  })

  describe("calculateAdvanceOffer", () => {
    it("should calculate complete offer with default rates", () => {
      const offer = calculateAdvanceOffer(5000)

      expect(offer.invoiceAmount).toBe(5000)
      expect(offer.maxAdvance).toBe(3500)
      expect(offer.processingFee).toBe(35)
      expect(offer.netPayout).toBe(3465)
      expect(offer.ltvRatio).toBe(0.7)
      expect(offer.feeRate).toBe(0.01)
      expect(offer.ltvPercentage).toBe(70)
      expect(offer.feePercentage).toBe(1)
    })

    it("should calculate complete offer with custom rates", () => {
      const offer = calculateAdvanceOffer(10000, 0.8, 0.015)

      expect(offer.invoiceAmount).toBe(10000)
      expect(offer.maxAdvance).toBe(8000)
      expect(offer.processingFee).toBe(120)
      expect(offer.netPayout).toBe(7880)
      expect(offer.ltvRatio).toBe(0.8)
      expect(offer.feeRate).toBe(0.015)
      expect(offer.ltvPercentage).toBe(80)
      expect(offer.feePercentage).toBe(2)
    })

    it("should handle edge cases", () => {
      const offer = calculateAdvanceOffer(1234.56, 0.75, 0.012)

      expect(offer.invoiceAmount).toBe(1234.56)
      expect(offer.maxAdvance).toBe(925.92)
      expect(offer.processingFee).toBe(11.12)
      expect(offer.netPayout).toBe(914.8)
      expect(offer.ltvPercentage).toBe(75)
      expect(offer.feePercentage).toBe(1)
    })
  })
})
