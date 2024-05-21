import { act, renderHook } from '@testing-library/react-hooks';

import { mockAppSelector, mockSetError, mockWatch } from 'mocks/helpers';

import { useSubmitDrivers } from '../useSubmitDrivers';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

const submitFn = jest.fn();

beforeEach(() => {
  submitFn.mockReset();
});

describe('WHEN "useSubmitDrivers" is mounted', () => {
  it('AND no same drivers MUST NOT set error and MUST CALL submit', () => {
    mockAppSelector.mockReturnValue({
      multipleFormsData: {
        driverId1: {
          data: {
            fullName: {
              label: 'Петров Петр Петрович',
              value: 'Петров Петр Петрович',
            },
            birthday: '01.01.1990',
          },
        },
      },
    });
    mockWatch.mockImplementation(
      (param: 'fullName' | 'birthday') =>
        ({
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          birthday: '01.01.1990',
        }[param]),
    );

    const { result } = renderHook(() => useSubmitDrivers('driver', submitFn));
    act(() => {
      result.current();
    });
    expect(mockSetError).toHaveBeenCalledTimes(0);
    expect(submitFn).toHaveBeenCalledTimes(1);
  });

  it('AND has the same driver fio and date MUST set error and NOT CALL submit', () => {
    mockAppSelector.mockReturnValue({
      multipleFormsData: {
        driverId1: {
          data: {
            fullName: {
              label: 'Иванов Иван Иванович',
              value: 'Иванов Иван Иванович',
            },
            birthday: '01.01.1990',
          },
        },
      },
    });
    mockWatch.mockImplementation(
      (param: 'fullName' | 'birthday') =>
        ({
          fullName: {
            label: 'Иванов Иван Иванович',
            value: 'Иванов Иван Иванович',
          },
          birthday: '01.01.1990',
        }[param]),
    );

    const { result } = renderHook(() => useSubmitDrivers('driver', submitFn));
    act(() => {
      result.current();
    });
    expect(mockSetError).toHaveBeenCalledWith('birthday', {
      message: 'ФИО и Дата рождения совпадают с уже добавленным водителем',
    });
    expect(submitFn).toHaveBeenCalledTimes(0);
  });

  it('AND has the same driver license MUST set error and NOT CALL submit', () => {
    mockAppSelector.mockReturnValue({
      multipleFormsData: {
        driverId1: {
          data: {
            fullName: {
              label: 'Иванов Иван Иванович',
              value: 'Иванов Иван Иванович',
            },
            birthday: '01.01.1990',
            licenceNumber: '123456',
          },
        },
      },
    });
    mockWatch.mockImplementation(
      (param: 'fullName' | 'birthday' | 'licenceNumber') =>
        ({
          fullName: {
            label: 'Сидоров Сидр Сидорович',
            value: 'Сидоров Сидр Сидорович',
          },
          birthday: '01.01.1990',
          licenceNumber: '123456',
        }[param]),
    );

    const { result } = renderHook(() => useSubmitDrivers('driver', submitFn));
    act(() => {
      result.current();
    });
    expect(mockSetError).toHaveBeenCalledWith('licenceNumber', {
      message: 'Серия и номер ВУ совпадают с уже добавленным водителем Сидоров Сидр Сидорович',
    });
    expect(submitFn).toHaveBeenCalledTimes(0);
  });

  it('AND driver ID is the same MUST not set error and CALL submit', () => {
    mockAppSelector.mockReturnValue({
      multipleFormsData: {
        driverId1: {
          data: {
            fullName: {
              label: 'Иванов Иван Иванович',
              value: 'Иванов Иван Иванович',
            },
            birthday: '01.01.1990',
            licenceNumber: '123456',
          },
        },
      },
    });
    mockWatch.mockImplementation(
      (param: 'fullName' | 'birthday' | 'licenceNumber') =>
        ({
          fullName: {
            label: 'Сидоров Сидр Сидорович',
            value: 'Сидоров Сидр Сидорович',
          },
          birthday: '01.01.1990',
          licenceNumber: '123456',
        }[param]),
    );

    const { result } = renderHook(() => useSubmitDrivers('driverId1', submitFn));
    act(() => {
      result.current();
    });
    expect(mockSetError).toHaveBeenCalledTimes(0);
    expect(submitFn).toHaveBeenCalledTimes(1);
  });
});
