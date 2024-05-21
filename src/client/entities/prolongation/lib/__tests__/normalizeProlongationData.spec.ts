import { normalizeProlongationData } from '../normalizeProlongationData';

import { PROLONGATION_MOCK } from './prolongationMock';

describe('WHEN "normalizeProlongationData" is called', () => {
  it('AND prolongation type was not provided, MUST return default map', () => {
    expect(normalizeProlongationData(null)).toEqual({
      description: '',
    });
  });

  it('AND prolongation type was provided, MUST return transformed data for prolongation UI', () => {
    expect(
      normalizeProlongationData({
        ...PROLONGATION_MOCK,
        type: 'sravniProlongation',
      }),
    ).toEqual({
      description: 'Some description text',
      infoAuth: [
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
      infoUnAuth: [
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
      maskedPhone: '7904***0000',
      orderHash: '12341234',
      type: 'sravniProlongation',
    });
  });
});
