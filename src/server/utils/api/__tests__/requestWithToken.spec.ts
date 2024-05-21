import { AUTH_HEADER_MOCK, mockAxiosGet, mockAxiosPost, TEST_ERROR } from '../../../../__mocks__';
import {
  requestWithTokenGet,
  requestWithTokenPost,
  requestWithTokenGetRetriable,
  requestWithTokenPostRetriable,
} from '../api';

describe('WHEN "requestWithToken" is called', () => {
  beforeEach(() => {
    mockAxiosGet.mockReturnValue({ data: true });
  });
  it('AND it is get request, MUST use get request flow', async () => {
    await requestWithTokenGet('test', '');

    expect(mockAxiosGet).toHaveBeenCalledWith('test', AUTH_HEADER_MOCK);
  });
  it('AND request succeed, MUST return data from request provider', async () => {
    expect(await requestWithTokenGet('test', '')).toBeTruthy();
  });
  it('AND request failed, MUST throw error', async () => {
    mockAxiosGet.mockRejectedValue(TEST_ERROR);
    let error: Nullable<Error> = null;
    try {
      await requestWithTokenGet('test', '');
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(TEST_ERROR);
  });

  it('AND it is get request with retry, MUST use get retriable request flow', async () => {
    await requestWithTokenGetRetriable('test', '');

    expect(mockAxiosGet).toHaveBeenCalledWith('test', AUTH_HEADER_MOCK);
  });

  it('AND it is post request, MUST use post request flow', async () => {
    await requestWithTokenPost('test', '');

    expect(mockAxiosPost).toHaveBeenCalledWith('test', {}, AUTH_HEADER_MOCK);
  });

  it('AND it is post request with retry, MUST use post retriable request flow', async () => {
    await requestWithTokenPostRetriable('test', '');
    expect(mockAxiosPost).toHaveBeenCalledWith('test', {}, AUTH_HEADER_MOCK);
  });
  it('AND request succeed with retry, MUST return data from request provider', async () => {
    expect(await requestWithTokenGetRetriable('test', '')).toBeTruthy();
  });
  it('AND request failed with retry, MUST throw error', async () => {
    mockAxiosGet.mockRejectedValue(TEST_ERROR);
    await expect(requestWithTokenGetRetriable('test', '')).rejects.toThrowError(TEST_ERROR);
  });
});
