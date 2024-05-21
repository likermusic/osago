import type { Profile } from 'commonTypes/api/profile';

import { config } from '../../constants/config';
import { requestWithTokenPost } from '../../utils/api/api';

export const postPeople = async (userToken: string) => {
  const { data } = await requestWithTokenPost<Profile.PostPeopleResponse, Profile.PostPeopleRequest>(
    `${config.OSAGOGATEWAY}/v2/profile/people`,
    config.OSAGOGATEWAY_SERVICE_SCOPE,
    { userToken },
  );
  return data;
};
