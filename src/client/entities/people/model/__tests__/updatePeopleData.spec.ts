import { PERSON_WITH_FULL_DATA_1, PERSON_WITH_FULL_DATA_2, PERSON_WITH_ONLY_DRIVER_DATA_1 } from 'mocks/person';

import type { TPerson } from 'entities/people';
import { peopleSlice, updatePeopleData } from 'entities/people';

const FULL_DATA_PERSON_FROM_ONLY_DRIVER_DRIVER: TPerson = {
  ...PERSON_WITH_ONLY_DRIVER_DATA_1,
  address: {
    source: {
      data: {
        fias_level: '8',
        region: 'Москва',
      },
    },
    value: 'г Москва, ул Профсоюзная, д 12',
  },
  passportNumber: '7721122121',
  passportIssueDate: '07.07.2022',
  addressFlat: '10',
};

const generateState = (peopleArray: TPerson[]) => ({
  people: peopleArray,
});

describe('WHEN "updatePeopleData" is called', () => {
  it('MUST add to store new person ', () => {
    const peopleArray = [PERSON_WITH_ONLY_DRIVER_DATA_1, PERSON_WITH_FULL_DATA_1];
    const state = generateState(peopleArray);

    expect(peopleSlice.reducer(state, updatePeopleData(PERSON_WITH_FULL_DATA_2))).toEqual(
      generateState([...peopleArray, PERSON_WITH_FULL_DATA_2]),
    );
  });

  it('AND person data partial, MUST add new data to the same person ', () => {
    const peopleArray = [PERSON_WITH_ONLY_DRIVER_DATA_1, PERSON_WITH_FULL_DATA_1];
    const state = generateState(peopleArray);

    expect(peopleSlice.reducer(state, updatePeopleData(FULL_DATA_PERSON_FROM_ONLY_DRIVER_DRIVER))).toEqual(
      generateState([FULL_DATA_PERSON_FROM_ONLY_DRIVER_DRIVER, PERSON_WITH_FULL_DATA_1]),
    );
  });

  it('AND person already in store AND data in payload the same, MUST nothing change', () => {
    const peopleArray = [PERSON_WITH_ONLY_DRIVER_DATA_1, PERSON_WITH_FULL_DATA_1];
    const state = generateState(peopleArray);

    expect(peopleSlice.reducer(state, updatePeopleData(PERSON_WITH_FULL_DATA_1))).toEqual(state);
  });

  it('AND person already in store AND data in payload different, MUST update store', () => {
    const peopleArray = [PERSON_WITH_ONLY_DRIVER_DATA_1, PERSON_WITH_FULL_DATA_1];
    const state = generateState(peopleArray);

    const passportIssueDate = '01.01.2020';
    const newDataForPerson1 = { ...PERSON_WITH_ONLY_DRIVER_DATA_1, passportIssueDate };

    expect(peopleSlice.reducer(state, updatePeopleData(newDataForPerson1))).toEqual(
      generateState([newDataForPerson1, PERSON_WITH_FULL_DATA_1]),
    );
  });
});
