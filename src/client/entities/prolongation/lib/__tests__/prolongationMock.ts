import type { TFoundedProlongationPolicy } from '../../types';

export const PROLONGATION_MOCK: TFoundedProlongationPolicy['prolongationPolicyByCarNumber'] = {
  carNumber: 'c912тт22',
  drivers: [{ fullName: 'Иванов Иван Иванович' }, { fullName: 'Сергеев Сергей Сергеевич' }],
  brandName: 'Kia',
  companyName: 'Тинькофф',
  companyId: 126810,
  maskedPhone: '7904***0000',
  modelName: 'Sportage',
  driversAmount: 1,
  policyEndDate: new Date().toUTCString(),
  previousPolicyNumber: '12345',
  userName: 'Иванов Иван Иванович',
  description: 'Some description text',
  orderHash: '12341234',
  price: 12300,
  vehicleYear: 2022,
};
