import { mockAxiosPost, AUTH_HEADER_MOCK } from '../../../../../__mocks__';
import { requestAssignUserIdPost } from '../userServices';

describe('WHEN "requestAssignUserIdPost" is called', () => {
  const body = {
    orderHash: 'orderHash',
    userId: 1,
  };

  describe('AND "order hash" was not provided', () => {
    it('MUST return empty list', async () => {
      expect(await requestAssignUserIdPost({ orderHash: '' })).toBeNull();
    });

    it('MUST NOT do query to server', async () => {
      await requestAssignUserIdPost({ orderHash: '' });

      expect(mockAxiosPost).not.toHaveBeenCalled();
    });
  });

  beforeAll(() => {
    mockAxiosPost.mockResolvedValue({ data: false });
  });

  it('MUST do request to service', async () => {
    await requestAssignUserIdPost(body);

    expect(mockAxiosPost).toHaveBeenCalledWith(`<OSAGOGATEWAY>/v1/orders/assignUserId`, body, AUTH_HEADER_MOCK);
  });

  it('MUST return data about order', async () => {
    expect(await requestAssignUserIdPost(body)).toEqual(false);
  });
});
