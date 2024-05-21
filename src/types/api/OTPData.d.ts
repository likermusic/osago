export declare namespace OTP {
  export type OtpAccountData = {
    number: string;
    bic: string;
    type: string;
    currency: string;
    name: string;
    availableBalance?: number;
    cardNumber?: string;
  };

  export type OtpGender = 'm' | 'f';

  export type OtpUserData = {
    clientId: string;
    personalData: {
      firstName: string;
      lastName: string;
      middleName: string;
      gender: OtpGender;
      citizenship: string | number; // ISO 3166-1 numeric code
      passportNumber: string;
      passportIssueDate: string; //  ISO 8601 (YYYY-MM-DD)
      passportIssuer: string;
      passportIssuerCode: string;
      birthDate: string;
      birthPlace: string;
      registrationAddress: string;
      actualAddress: string;
      phone: string;
      email?: string;
      inn?: string;
      snils?: string;
    };
    complianceData?: {
      complianceDataApproved: boolean;
      incomeSources?: {
        salary: boolean;
        business: boolean;
        stocks: boolean;
        derivatives: boolean;
        forex: boolean;
        inheritance: boolean;
        donation: boolean;
        loan: boolean;
        another: boolean;
        anotherText: boolean;
      };
    };
    salesData?: {
      promoCode?: string;
      comments?: string;
    };
    accounts?: OtpAccountData[];
  };

  export type OtpTokenPayload = {
    iss: string;
    aud: string;
    exp: number;
    tokenData: OtpUserData;
  };
}
