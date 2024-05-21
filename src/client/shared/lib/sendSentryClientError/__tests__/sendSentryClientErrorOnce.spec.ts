import { mockSendSentryClientError } from 'mocks/helpers/sendSentryClientErrorMock';

import { sendSentryClientErrorOnce } from '../sendSentryClientErrorOnce';

const ID = 'id';

describe('WHEN "sendSentryClientErrorOnce" is called', () => {
  it('MUST send error with the same ID only once', () => {
    sendSentryClientErrorOnce(ID, 'message');
    sendSentryClientErrorOnce(ID, 'message');

    expect(mockSendSentryClientError).toHaveBeenCalledTimes(1);
    expect(mockSendSentryClientError).toHaveBeenCalledWith('message');
  });

  it('MUST send error with the same message only once', () => {
    sendSentryClientErrorOnce(true, 'message');
    sendSentryClientErrorOnce(true, 'message');

    expect(mockSendSentryClientError).toHaveBeenCalledTimes(1);
    expect(mockSendSentryClientError).toHaveBeenCalledWith('message');
  });

  it('MUST send all errors', () => {
    const messageArray = ['message1', 'message2', 'message3'];

    messageArray.forEach((message) => {
      sendSentryClientErrorOnce(true, message);
    });

    expect(mockSendSentryClientError).toHaveBeenCalledTimes(messageArray.length);

    messageArray.forEach((message) => {
      expect(mockSendSentryClientError).toHaveBeenCalledWith(message);
    });
  });
});
