export const localStorageKeys = {
  /** храним данные стора в session при перезагрузке страницы **/
  appState: 'appState-v2',

  /** храним данные в формате общей квери **/
  clientDataV3: 'mmrData-v3',

  /** * используется на новом проекте для подсказки номера мотоцикла на лендинге в поле ввода**/
  carNumbersListV2: 'mmrNums',
  /** * используется на старом проекте, вл и новом проекте для подсказки номера авто на лендинге в поле ввода**/
  motoNumbersList: 'mmrNumsMoto',

  /** храним предыдущий шаг пользователя по бековской аналитике (sendAnalyticEvents)**/
  previousStepName: 'previousStepName',
};

export const oldLocalStorageKeys = {
  /** @deprecated
   * использовался на старом проекте и вл для хранения данных анкеты
   ***/
  clientDataV2: 'mmrData-v2',
  /** @deprecated
   * удаляется у пользователей с 06.2021  **/
  clientDataV1: 'mmrData-v1',
  /** @deprecated
   * удаляется у пользователей с 2020 **/
  vehicleNumbersListV1: 'mmrData',
};
