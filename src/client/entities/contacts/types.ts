export type ContactsCommonFields = {
  mobilePhone: string;
  email: string;
  smsCode: '';
  userAgreement: boolean;
};

export type ContactsEntityReducer = Form.Single<ContactsCommonFields> & {
  isFilledByEsiaStatus?: boolean;
};
