function validateCreditCardNumber(cardNumber: string): boolean {
  // Remove all non-digit characters
  const sanitized = cardNumber.replace(/\D/g, '');

  // Check if the input is empty or contains non-digit characters
  if (!sanitized) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  // Iterate over the digits in reverse order
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  // If the sum is a multiple of 10, the card number is valid
  return sum % 10 === 0;
}

// Example usage:
const cardNumber = '1234567812345670';
console.log(validateCreditCardNumber(cardNumber)); // Output: false
