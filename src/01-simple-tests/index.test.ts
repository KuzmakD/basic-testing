import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 13, b: 22, action: Action.Add })).toBe(35);
    expect(simpleCalculator({ a: 7, b: 4, action: '+' })).toBe(11);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 62, b: 12, action: Action.Subtract })).toBe(
      50,
    );
    expect(simpleCalculator({ a: 7, b: 4, action: '-' })).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 7, action: Action.Multiply })).toBe(42);
    expect(simpleCalculator({ a: 7, b: 4, action: '*' })).toBe(28);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 36, b: 6, action: Action.Divide })).toBe(6);
    expect(simpleCalculator({ a: 8, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
    expect(simpleCalculator({ a: 8, b: 4, action: '/' })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 7, b: 3, action: '^' })).toBe(343);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 7, action: 'plus' })).toBeNull();
    expect(simpleCalculator({ a: 5, b: 7, action: 3 })).toBeNull();
    expect(simpleCalculator({ a: 5, b: 7, action: '++' })).toBeNull();
    expect(simpleCalculator({ a: 5, b: 7, action: '' })).toBeNull();
    expect(simpleCalculator({ a: 5, b: 7, action: ['/'] })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '7', b: 4, action: '+' })).toBeNull();
    expect(simpleCalculator({ a: 8, b: '4', action: '-' })).toBeNull();
    expect(simpleCalculator({ a: '7', b: '4', action: '*' })).toBeNull();
  });
});
