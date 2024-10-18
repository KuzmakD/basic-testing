import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({ create: jest.fn() }));
jest.mock('lodash', () => ({ throttle: jest.fn((fn) => fn) }));

const data = { info1: 1, info2: 2, info3: 3 };

beforeEach(() => {
  const instance = { get: jest.fn(() => Promise.resolve({ data })) };
  (axios.create as jest.Mock).mockReturnValue(instance);
});

afterEach(() => jest.clearAllMocks());

describe('throttledGetDataFromApi', () => {
  const path = '/article/457';
  const url = { baseURL: 'https://jsonplaceholder.typicode.com' };

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);
    expect(axios.create).toHaveBeenCalledWith(url);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    expect(axios.create().get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(path);
    expect(result).toEqual(data);
  });
});
