export function calculateAdvanceAmount(invoiceAmount: number, ltvRatio = 0.7): number {
  if (invoiceAmount <= 0) {
    throw new Error("Invoice amount must be greater than 0")
  }

  if (ltvRatio <= 0 || ltvRatio > 1) {
    throw new Error("LTV ratio must be between 0 and 1")
  }

  return Math.floor(invoiceAmount * ltvRatio * 100) / 100 // Round down to 2 decimal places
}

/**
 * Calculate processing fee for an advance
 * @param advanceAmount - The advance amount
 * @param feeRate - Fee rate (default: 0.01 for 1%)
 * @returns The processing fee
 */
export function calculateProcessingFee(advanceAmount: number, feeRate = 0.01): number {
  if (advanceAmount <= 0) {
    throw new Error("Advance amount must be greater than 0")
  }

  if (feeRate < 0 || feeRate > 1) {
    throw new Error("Fee rate must be between 0 and 1")
  }

  return Math.ceil(advanceAmount * feeRate * 100) / 100 // Round up to 2 decimal places
}

/**
 * Calculate net payout after fees
 * @param advanceAmount - The advance amount
 * @param feeRate - Fee rate (default: 0.01 for 1%)
 * @returns The net payout amount
 */
export function calculateNetPayout(advanceAmount: number, feeRate = 0.01): number {
  const fee = calculateProcessingFee(advanceAmount, feeRate)
  return advanceAmount - fee
}

/**
 * Calculate advance offer details
 * @param invoiceAmount - The total invoice amount
 * @param ltvRatio - Loan-to-value ratio (default: 0.7 for 70%)
 * @param feeRate - Fee rate (default: 0.01 for 1%)
 * @returns Complete advance offer breakdown
 */
export function calculateAdvanceOffer(invoiceAmount: number, ltvRatio = 0.7, feeRate = 0.01) {
  const maxAdvance = calculateAdvanceAmount(invoiceAmount, ltvRatio)
  const processingFee = calculateProcessingFee(maxAdvance, feeRate)
  const netPayout = calculateNetPayout(maxAdvance, feeRate)

  return {
    invoiceAmount,
    maxAdvance,
    processingFee,
    netPayout,
    ltvRatio,
    feeRate,
    ltvPercentage: Math.round(ltvRatio * 100),
    feePercentage: Math.round(feeRate * 100),
  }
}
