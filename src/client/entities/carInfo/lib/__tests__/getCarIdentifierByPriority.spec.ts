import { getCarIdentifierByPriority } from '../getCarIdentifierByPriority';

describe('WHEN "getCarIdentifierByPriority" is called', () => {
  it('AND function gets vin MUST return correct value', () => {
    const vin = '31456037480975346';
    const bodyNumber = '23456423609843089697';
    const chassisNumber = '29572438967945837698';

    expect(getCarIdentifierByPriority({ carVinNumber: vin, bodyNumber, chassisNumber })).toEqual({
      vin,
    });
  });

  it('AND function does not get vin but gets body number MUST return correct value', () => {
    const vin = '';
    const bodyNumber = '23456423609843089697';
    const chassisNumber = '29572438967945837698';

    expect(getCarIdentifierByPriority({ carVinNumber: vin, bodyNumber, chassisNumber })).toEqual({
      bodyNumber,
    });
  });

  it('AND function does not get vin and body number but gets chassis number MUST return correct value', () => {
    const vin = '';
    const bodyNumber = '';
    const chassisNumber = '29572438967945837698';

    expect(getCarIdentifierByPriority({ carVinNumber: vin, bodyNumber, chassisNumber })).toEqual({
      chassisNumber,
    });
  });

  it('AND function does not get any values must return empty object', () => {
    const vin = '';
    const bodyNumber = '';
    const chassisNumber = '';

    expect(getCarIdentifierByPriority({ carVinNumber: vin, bodyNumber, chassisNumber })).toEqual({});
  });
});
