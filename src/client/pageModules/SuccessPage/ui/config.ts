export const getSubtitleText = (policyNumber = '', email = 'e-mail'): string =>
  `Ваш полис ${policyNumber} уже в базе страховой компании и РСА, а также отправлен на ${email}`;
