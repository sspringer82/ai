import { describe, it, expect } from 'vitest';
import { fibonacci } from './fibonacci';

// tag1/code/fibonacci.test.ts
describe('fibonacci', () => {
  it('should return 0 for n = 0', () => {
    expect(fibonacci(0)).toBe(0);
  });

  it('should return 1 for n = 1', () => {
    expect(fibonacci(1)).toBe(1);
  });

  it('should return 1 for n = 2', () => {
    expect(fibonacci(2)).toBe(1);
  });

  it('should return 2 for n = 3', () => {
    expect(fibonacci(3)).toBe(2);
  });

  it('should return 5 for n = 5', () => {
    expect(fibonacci(5)).toBe(5);
  });

  it('should return 55 for n = 10', () => {
    expect(fibonacci(10)).toBe(55);
  });

  it('should return 6765 for n = 20', () => {
    expect(fibonacci(20)).toBe(6765);
  });
});
