import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'node:fs';
import path from 'node:path';

describe('doStuffByTimeout', () => {
  let mockFn: jest.Mock;
  let spy: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockFn = jest.fn();
    spy = jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(mockFn, 500);
    expect(spy).toHaveBeenCalledWith(mockFn, 500);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockFn, 200);
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let mockFn: jest.Mock;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    mockFn = jest.fn();
    spy = jest.spyOn(global, 'setInterval');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(mockFn, 500);
    expect(spy).toHaveBeenCalledWith(mockFn, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(mockFn, 1000);
    expect(mockFn).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'path-to-file.txt';
  const fileContent = 'File content';

  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join').mockReturnValue(`test.txt`);
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(
      expect.stringContaining(__dirname),
      expect.stringContaining(pathToFile),
    );
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(Buffer.from(fileContent));
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});
