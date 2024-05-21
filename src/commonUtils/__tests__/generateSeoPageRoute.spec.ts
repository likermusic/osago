import { generateSeoPageRoute, PARAM_ATTR_DIVIDER, PARAM_ATTR_ID } from '../routeGenerator';

describe('WHEN "generateSeoPageRoute" is called', () => {
  it('AND provided key is non required param, MUST generate regexp pattern', () => {
    const test = generateSeoPageRoute('/osago', [`seoParam${PARAM_ATTR_DIVIDER}${PARAM_ATTR_ID}`]);

    expect(test.source).toEqual(/^\/osago\/(?<seoParam>[-\w]*)\/?$/.source);
    expect(test.test('/osago/seoParam')).toBeTruthy();
  });

  it('AND provided more then one key as non required param, MUST generate regexp pattern', () => {
    const test = generateSeoPageRoute('/osago', [
      `seoParam${PARAM_ATTR_DIVIDER}${PARAM_ATTR_ID}`,
      `seoParam1${PARAM_ATTR_DIVIDER}${PARAM_ATTR_ID}`,
    ]);

    expect(test.source).toEqual(/^\/osago\/(?<seoParam>[-\w]*)\/(?<seoParam1>[-\w]*)\/?$/.source);
    expect(test.test('/osago/seoParamName/seoParamName1')).toBeTruthy();
  });

  it('AND one of provided key is non required param AND other is particular value, MUST generate regexp pattern', () => {
    const test = generateSeoPageRoute('/osago', [
      `insuranceCompany${PARAM_ATTR_DIVIDER}${PARAM_ATTR_ID}`,
      'avtostrakhovanie',
    ]);

    expect(test.source).toEqual(/^\/osago\/(?<insuranceCompany>[-\w]*)\/avtostrakhovanie\/?$/.source);
    expect(test.test('/osago/seoParamName/avtostrakhovanie')).toBeTruthy();
  });

  it('AND one of provided key is particular value AND others a parametres, MUST generate regexp pattern', () => {
    const test = generateSeoPageRoute('/osago', [
      `insuranceCompany${PARAM_ATTR_DIVIDER}${PARAM_ATTR_ID}`,
      'avtostrakhovanie',
      `productLocation${PARAM_ATTR_DIVIDER}${PARAM_ATTR_ID}`,
    ]);

    expect(test.source).toEqual(
      /^\/osago\/(?<insuranceCompany>[-\w]*)\/avtostrakhovanie\/(?<productLocation>[-\w]*)\/?$/.source,
    );
    expect(test.test('/osago/seoParamName/avtostrakhovanie/someProductLocation')).toBeTruthy();
  });
});
