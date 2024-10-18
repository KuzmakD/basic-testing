import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(spy).not.toBeCalled();
    // or
    expect(console.log).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
