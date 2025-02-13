import { describe, it, expect } from 'vitest';
import { validateCreditCardNumber } from '../testing/validateCreditCardNumber';

describe('validateCreditCardNumber', () => {
  it('should return false for an invalid card number', () => {
    const invalidCardNumber = '1234567812345670';
    expect(validateCreditCardNumber(invalidCardNumber)).toBe(false);
  });

  it('should return true for a valid card number', () => {
    const validCardNumber = '4532015112830366'; // Example of a valid Visa card number
    expect(validateCreditCardNumber(validCardNumber)).toBe(true);
  });

  it('should return false for an empty string', () => {
    expect(validateCreditCardNumber('')).toBe(false);
  });

  it('should return false for a card number with non-digit characters', () => {
    const invalidCardNumber = '1234-5678-1234-5670';
    expect(validateCreditCardNumber(invalidCardNumber)).toBe(false);
  });

  it('should return true for a valid card number with spaces', () => {
    const validCardNumber = '4532 0151 1283 0366'; // Example of a valid Visa card number with spaces
    expect(validateCreditCardNumber(validCardNumber)).toBe(true);
  });

  it.each([
    '4532015112830366', // Valid Visa
    '6011514433546201', // Valid Discover
    '371449635398431', // Valid American Express
    '5555555555554444', // Valid MasterCard
    '30569309025904', // Valid Diners Club
  ])('should return true for valid card number %s', (validCardNumber) => {
    expect(validateCreditCardNumber(validCardNumber)).toBe(true);
  });

  it.each([
    '4532015112830367', // Invalid Visa
    '6011514433546202', // Invalid Discover
    '371449635398432', // Invalid American Express
    '5555555555554445', // Invalid MasterCard
    '30569309025905', // Invalid Diners Club
  ])('should return false for invalid card number %s', (invalidCardNumber) => {
    expect(validateCreditCardNumber(invalidCardNumber)).toBe(false);
  });
});
