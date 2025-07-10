
/**
 * Utility functions for decimal to fraction conversion
 */

/**
 * Convert decimal to fraction with enhanced precision
 * @param {number} decimal - The decimal number to convert
 * @param {number} maxDenominator - Maximum allowed denominator
 * @returns {Object} - Object with numerator, denominator, and formatted string
 */
function decimalToFraction(decimal, maxDenominator = 1000) {
  // Handle special cases
  if (decimal === 0) return { numerator: 0, denominator: 1, fraction: "0" };
  
  const sign = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);
  
  const wholePart = Math.floor(decimal);
  const fractionalPart = decimal - wholePart;
  
  if (fractionalPart === 0) {
    return { 
      numerator: sign * wholePart, 
      denominator: 1, 
      fraction: (sign * wholePart).toString() 
    };
  }

  // Use continued fractions for better approximation
  let bestNumerator = 1;
  let bestDenominator = 1;
  let bestError = Math.abs(fractionalPart - bestNumerator / bestDenominator);

  // Check common fractions first
  const commonFractions = [
    [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
    [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
    [1, 8], [3, 8], [5, 8], [7, 8], [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9],
    [1, 10], [3, 10], [7, 10], [9, 10]
  ];

  for (const [num, den] of commonFractions) {
    if (den <= maxDenominator) {
      const error = Math.abs(fractionalPart - num / den);
      if (error < bestError) {
        bestNumerator = num;
        bestDenominator = den;
        bestError = error;
      }
    }
  }

  // If we found a good approximation, use it
  if (bestError < 0.001) {
    const finalNumerator = sign * (wholePart * bestDenominator + bestNumerator);
    
    if (bestDenominator === 1) {
      return { 
        numerator: finalNumerator, 
        denominator: 1, 
        fraction: finalNumerator.toString() 
      };
    }
    
    return { 
      numerator: finalNumerator, 
      denominator: bestDenominator, 
      fraction: `${finalNumerator}/${bestDenominator}` 
    };
  }

  // If no good fraction found, return decimal
  const formatted = decimal.toFixed(4).replace(/\.?0+$/, '');
  return { 
    numerator: decimal, 
    denominator: 1, 
    fraction: sign === -1 ? `-${formatted}` : formatted 
  };
}

/**
 * Format number as fraction or decimal
 * @param {number} value - Number to format
 * @param {number} maxDenominator - Maximum denominator for fractions
 * @returns {string} - Formatted string
 */
function formatAsDisplay(value, maxDenominator = 1000) {
  if (typeof value !== 'number' || isNaN(value)) {
    return value.toString();
  }

  if (Math.abs(value) < 0.0001) {
    return "0";
  }

  const result = decimalToFraction(value, maxDenominator);
  return result.fraction;
}

module.exports = {
  decimalToFraction,
  formatAsDisplay
};