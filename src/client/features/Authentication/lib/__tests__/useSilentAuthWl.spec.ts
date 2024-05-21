import type { IUser } from '@sravni/types/lib/auth';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { mockAppDispatch } from 'mocks/helpers';

import { setUser } from 'entities/user';

import { useSilentAuthWl } from '../useSilentAuthWl';

describe('WHEN "useSilentAuthWl" is mounted', () => {
  const phone = '79009019932';
  it('AND wl auth was called, MUST partially update user data', () => {
    const { result } = renderHook(() => useSilentAuthWl());

    act(() => {
      result.current(phone, '1234', 'Иван');
    });

    expect(mockAppDispatch).toHaveBeenCalledWith(
      setUser({
        phone_number: phone,
        sub: '1234',
        name: 'Иван',
      } as IUser),
    );
  });
});
