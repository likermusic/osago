import { TEST_ERROR } from '../../../../__mocks__';
import { doGetRequest } from '../doGetRequest';

describe('WHEN "doGetRequest" is called', () => {
  const getRequestInstance = jest.fn();
  const mockCheckRetry = jest.fn();
  const url = 'url';

  const args = { method: getRequestInstance, url, checkRetry: mockCheckRetry };

  beforeEach(() => {
    getRequestInstance.mockResolvedValue(true);
  });

  it('MUST do request by provided data', async () => {
    await doGetRequest(args);
    expect(getRequestInstance).toHaveBeenCalledWith('url', { headers: undefined });
  });

  it('AND request succeed, MUST return responded value', async () => {
    expect(await doGetRequest(args)).toBeTruthy();
  });

  describe('AND request failed', () => {
    describe('AND retryCount is not reach', () => {
      it('AND checkRetry true, MUST do retry', async () => {
        getRequestInstance.mockRejectedValue(TEST_ERROR);
        mockCheckRetry.mockReturnValueOnce(true);

        try {
          await doGetRequest(args);
        } catch (e) {
        } finally {
          expect(getRequestInstance).toBeCalledTimes(2);
        }
      });

      it('AND checkRetry false, MUST not do retry', async () => {
        getRequestInstance.mockRejectedValue(TEST_ERROR);
        mockCheckRetry.mockReturnValue(false);

        await expect(async () => {
          await doGetRequest(args);
        }).rejects.toThrowError(TEST_ERROR);
        expect(getRequestInstance).toBeCalledTimes(1);
        expect(mockCheckRetry).toHaveBeenCalled();
      });
    });
  });
});
