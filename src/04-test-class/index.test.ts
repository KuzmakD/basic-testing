import lodash from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let initBalance: number;
  let bankAccount: BankAccount;
  let bankTransferAccount: BankAccount;

  beforeEach(() => {
    initBalance = 500;
    bankAccount = new BankAccount(initBalance);
    bankTransferAccount = new BankAccount(initBalance);
  });

  test('should create account with initial balance', () => {
    expect(getBankAccount(initBalance)).toEqual(bankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(555)).toThrowError(
      new InsufficientFundsError(initBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(650, bankTransferAccount)).toThrowError(
      new InsufficientFundsError(initBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(450, bankAccount)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(1000).getBalance()).toBe(initBalance + 1000);
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(333).getBalance()).toBe(initBalance - 333);
  });

  test('should transfer money', () => {
    expect(bankAccount.transfer(150, bankTransferAccount).getBalance()).toBe(
      initBalance - 150,
    );
    expect(bankTransferAccount.getBalance()).toBe(initBalance + 150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    expect(await bankAccount.fetchBalance()).toBe(1);

    jest.spyOn(lodash, 'random').mockReturnValue(11);
    expect(await getBankAccount(100).fetchBalance()).toBe(11);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(15);
    const newAccount: BankAccount = new BankAccount(250);
    expect(newAccount.getBalance()).toBe(250);

    await newAccount.synchronizeBalance();
    expect(newAccount.getBalance()).toBe(15);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(0);
    expect(async () => await bankAccount.synchronizeBalance()).rejects.toEqual(
      new SynchronizationFailedError(),
    );
  });
});
