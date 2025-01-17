// linkPlace - место в котором текст будет заменен ссылкой для перехода в саммари.
export const NoPropositionsModalTexts = {
  btnText: 'Понятно',
  steps: [
    {
      idx: 1,
      linkPlace: 'Укажите конкретных водителей',
      subtitle: 'Укажите конкретных водителей, тогда будут применены все накопленные скидки за безаварийность (КБМ)',
      title: 'Полис без ограничений по количеству водителей',
    },
    {
      idx: 2,
      linkPlace: 'Поставьте',
      subtitle:
        'Поставьте датой начала действия полиса +4 дня от даты текущего расчета, потому что большинство компаний не берут на страхование с датой ранее',
      title: 'Дата начала действия полиса',
    },
    {
      idx: 3,
      linkPlace: 'Проверьте корректность',
      subtitle:
        'Возможно, вы оформляете полис на такси или на любую другую категорию, кроме В. Проверьте корректность заполнения данных и попробуйте еще раз',
      title: 'Пограничная категория авто',
    },
    {
      idx: 4,
      linkPlace: 'Укажите в качестве Страхователя',
      subtitle:
        'Укажите в качестве Страхователя одного из водителей или Собственника автомобиля — это снизит риск отказа страховой компании от оформления полиса',
      title: 'Проверьте данные страхователя',
    },
  ],
  title: 'Почему предложения от страховых компаний не поступили?',
};
