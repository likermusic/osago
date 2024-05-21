import { mapAuthorizedData } from '../mapAutorizedData';

import { PROLONGATION_MOCK } from './prolongationMock';

describe('WHEN "mapAuthorizedData is called', () => {
  it('MUST return mapped data for authorized user', () => {
    expect(mapAuthorizedData(PROLONGATION_MOCK)).toEqual({
      lastSearch: [
        {
          icon: 'drivers',
          subtitle: 'Иванов Иван Иванович •\u00A0Сергеев Сергей Сергеевич',
          title: '2 водителя',
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
          icon: 'auto',
          title: 'Kia Sportage, 2022',
        },
        {
          icon: 'policyEndDate',
          title: 'Закончится сегодня',
        },
      ],
    });
  });
});
