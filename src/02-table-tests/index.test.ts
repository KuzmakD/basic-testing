import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
    description: 'should add two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Subtract,
    expected: 1,
    description: 'should subtract two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Multiply,
    expected: 6,
    description: 'should multiply two numbers',
  },
  {
    a: 36,
    b: 2,
    action: Action.Divide,
    expected: 18,
    description: 'should divide two numbers',
  },
  {
    a: 3,
    b: 5,
    action: Action.Exponentiate,
    expected: 243,
    description: 'should exponentiate two numbers',
  },
  {
    a: '1',
    b: 2,
    action: Action.Add,
    expected: null,
    description: 'should return null for invalid arguments',
  },
  {
    a: 1,
    b: '2',
    action: Action.Add,
    expected: null,
    description: 'should return null for invalid arguments',
  },
  {
    a: '2',
    b: '2',
    action: Action.Subtract,
    expected: null,
    description: 'should return null for invalid arguments',
  },
  {
    a: 3,
    b: 2,
    action: 'minus',
    expected: null,
    description: 'should return null for invalid action',
  },
  {
    a: 3,
    b: 2,
    action: '++',
    expected: null,
    description: 'should return null for invalid action',
  },
  {
    a: 36,
    b: 2,
    action: 2,
    expected: null,
    description: 'should return null for invalid action',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$description', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
