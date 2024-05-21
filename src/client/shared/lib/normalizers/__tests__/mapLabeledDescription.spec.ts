import { mapLabeledDescription } from '../mapLabeledDescription';

describe('WHEN "mapLabeledDescription" is called', () => {
  it('AND all info is provided MUST map correctly', () => {
    const input = {
      description: 'Коэфф. возраст/стаж',
      label: 'МИН. СТАЖ – 2 ГОДА,МИН. ВОЗРАСТ – 24 ГОДА',
      title: 'КВС',
    };
    const expected = {
      description: 'Коэфф. возраст/стаж',
      labels: ['МИН. СТАЖ – 2 ГОДА', 'МИН. ВОЗРАСТ – 24 ГОДА'],
      title: 'КВС',
    };
    expect(mapLabeledDescription(input)).toStrictEqual(expected);
  });

  it('AND label is not provided MUST map correctly', () => {
    const input = {
      description: 'Коэфф. безаварийности',
      label: '',
      title: 'КБМ',
    };
    const expected = {
      description: 'Коэфф. безаварийности',
      labels: [],
      title: 'КБМ',
    };
    expect(mapLabeledDescription(input)).toStrictEqual(expected);
  });
});
