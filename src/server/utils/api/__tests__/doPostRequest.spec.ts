import { TEST_ERROR } from '../../../../__mocks__';
import { MAX_RETRY_COUNT } from '../checkRetry';
import { doPostRequest } from '../doPostRequest';

describe('WHEN "doPostRequest" is called', () => {
  const postRequestInstance = jest.fn();
  const mockCheckRetry = jest.fn();
  const url = 'url';

  const args = { method: postRequestInstance, url, checkRetry: mockCheckRetry };

  beforeEach(() => {
    postRequestInstance.mockResolvedValue(true);
  });

  it('MUST do request by provided data', async () => {
    await doPostRequest(args);

    expect(postRequestInstance).toHaveBeenCalledWith('url', {}, { headers: undefined });
  });

  it('AND request succeed, MUST return responded value', async () => {
    expect(await doPostRequest(args)).toBeTruthy();
  });

  describe('AND request failed', () => {
    describe('AND retryCount is not reach', () => {
      it('AND checkRetry true, MUST do retry', async () => {
        postRequestInstance.mockRejectedValue(TEST_ERROR);
        mockCheckRetry.mockReturnValueOnce(true);

        try {
          await doPostRequest(args);
        } catch (e) {
        } finally {
          expect(postRequestInstance).toBeCalledTimes(2);
        }
      });

      it('AND checkRetry false, MUST not do retry', async () => {
        postRequestInstance.mockRejectedValue(TEST_ERROR);
        await expect(
          async () =>
            // eslint-disable-next-line no-return-await
            await doPostRequest({
              method: postRequestInstance,
              url,
              data: {},
              headers: {},
              config: {},
              retryCount: MAX_RETRY_COUNT,
              checkRetry: mockCheckRetry,
            }),
        ).rejects.toThrowError(TEST_ERROR);
      });
    });
  });
});
