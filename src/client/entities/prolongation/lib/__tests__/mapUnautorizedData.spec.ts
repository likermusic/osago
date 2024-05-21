import { mapUnauthorizedData } from '../mapUnautorizedData';

import { PROLONGATION_MOCK } from './prolongationMock';

describe('WHEN "mapAuthorizedData is called', () => {
  it('MUST return mapped data for unauthorized user', () => {
    expect(mapUnauthorizedData(PROLONGATION_MOCK)).toEqual({
      lastSearch: [
        {
          icon: 'drivers',
          subtitle: 'Иванов Иван Иванович •\u00A0Сергеев Сергей Сергеевич',
          title: '2 водителя',
        },
        {
          icon: 'maskedPhone',
          subtitle: 'Если у вас сменился номер, заполните все данные вручную',
          title: '7904***0000',
        },
        {
          icon: 'auto',
          title: 'Kia Sportage, 2022',
        },
      ],
      newShortProlongation: [],
      shortProlongation: [],
      sravniProlongation: [
        {
          icon: 'userName',
          title: 'Иванов Иван Иванович',
        },
        {
          icon: 'maskedPhone',
          subtitle: 'Если у вас сменился номер, заполните все данные вручную',
          title: '7904***0000',
        },
        {
          icon: 'auto',
          title: 'Kia Sportage, 2022',
        },
      ],
    });
  });
});
