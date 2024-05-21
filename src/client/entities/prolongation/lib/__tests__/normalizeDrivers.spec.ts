import { normalizeDrivers } from 'entities/prolongation/lib/normalizeDrivers';

describe('WHEN "normalizeDrivers" is called', () => {
  it.each([[null], [undefined], [[]]])('AND "drivers" were not provided, MUST return empty string', (drivers) => {
    expect(normalizeDrivers(drivers)).toEqual('');
  });

  it('AND "drivers" were provided, MUST return joined string for all drivers', () => {
    expect(normalizeDrivers([{ fullName: 'Иванов Иван Иванович' }, { fullName: 'Сергеев Сергей Сергеевич' }])).toEqual(
      `Иванов Иван Иванович •\u00A0Сергеев Сергей Сергеевич`,
    );
  });
});
