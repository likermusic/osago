type IncorrectPayload = {
  message: 'OTP_DATA_EXTRACTION_ERROR_PAYLOAD';
  metricStatus: 'incorrect_payload';
};

type IncorrectToken = {
  message: 'OTP_DATA_EXTRACTION_ERROR';
  metricStatus: 'incorrect_token';
};

type IncorrectClientId = {
  message: 'OTP_DATA_EXTRACTION_ERROR_CLIENT_ID';
  metricStatus: 'wrong_client_id';
};

type IncorrectCountyCitizen = {
  message: 'OTP_DATA_EXTRACTION_ERROR_CITIZENSHIP';
  metricStatus: 'unsupported_country';
};

type TokenExpired = {
  message: 'OTP_DATA_EXTRACTION_ERROR_TOKEN_EXPIRED';
  metricStatus: 'token_expired';
};

type JwePrivateKeyNotFound = {
  message: 'OTP_JWE_PRIVATE_KEY_NOT_FOUND';
  metricStatus: 'jwePrivateKey_not_found';
};

type TPayload =
  | IncorrectPayload
  | IncorrectToken
  | IncorrectClientId
  | IncorrectCountyCitizen
  | TokenExpired
  | JwePrivateKeyNotFound;

export class OtpError extends Error {
  metricStatus: string;
  message: string;

  constructor({ metricStatus, message }: TPayload) {
    super(message);

    this.metricStatus = metricStatus;
    this.message = message;
  }
}
