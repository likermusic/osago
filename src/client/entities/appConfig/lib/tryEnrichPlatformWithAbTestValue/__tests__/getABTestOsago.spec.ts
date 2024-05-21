import { getABTestOsago } from '../getABTestOsago';

describe('WHEN "getABTestOsago" is called', () => {
  const currentExperiments =
    'e562f136-9ae6-4b2f.1|3bbfe23c-0705-4931.0|d40f200b-6c08-4f2d.1|c5ee7535-c4d9-4d95.1|8e3d1a50-71ee-417a.0|a182b343-7e10-4ba4.3';

  it.each([
    [null, '', null],
    [currentExperiments, '', null],
    [currentExperiments, 'e562f136-9ae6-4b2f', 'e562f136-9ae6-4b2f.1'],
  ])('AND "" is %p AND "" is %p, MUST return %p', (statisticsString, name, result) => {
    expect(getABTestOsago(statisticsString as string, name)).toEqual(result);
  });
});
