import { Calculations, Check, PrizeCup } from '@sravni/react-icons';

import prize1 from '../assets/prize1.png';
import prize2 from '../assets/prize2.png';
import prize3 from '../assets/prize3.png';
import prize4 from '../assets/prize4.png';
import raffleCardBackground from '../assets/raffleCardBackground.png';
import raffleCardBackgroundMobile from '../assets/raffleCardBackgroundMobile.png';
import mainImg from '../assets/RaffleCardImg.png';

const RULES_LINK = 'https://www.sravni.ru/r/BCSG';

export const RaffleCardConfig = {
  title: 'Разыгрываем 3\u00A0автомобиля и 1\u00A0миллион\u00A0рублей',
  subtitle: 'Просто зарегистрируйте полис, купленный с\u00A019\u00A0февраля по\u00A026\u00A0апреля на Сравни',
  mainImg,
  backgroundMobileUrl: raffleCardBackgroundMobile,
  backgroundDesktopUrl: raffleCardBackground,
};

export const raffleRegistrationConfig = {
  rulesLink: RULES_LINK,
  announceDateText: '20\u00A0мая',
  lotteryName: 'lottery021924',
};

export const getRaffleCardBtnsConfig = (isWebviewPage: boolean) => ({
  btnLeftText: isWebviewPage ? undefined : 'Купить полис ОСАГО',
  btnRightText: 'Зарегистрировать полис',
});

export const RafflePrizesConfig = {
  title: 'Призы',
  prizes: [
    {
      title: 'Три Geely\u00A0Coolray',
      img: { url: prize1, width: 326, height: 186 },
      color: 'blue' as const,
      subtitle: {
        type: 'badge' as const,
        value: 'Главный приз',
      },
    },
    {
      title: 'Один миллион рублей',
      img: { url: prize2, width: 326, height: 186 },
      color: 'green' as const,
      subtitle: {
        type: 'badge' as const,
        value: 'Главный приз',
      },
    },
    {
      title: 'Apple iPhone\u00A015',
      img: { url: prize3, width: 326, height: 148 },
      color: 'violet' as const,
      subtitle: {
        type: 'text' as const,
        value: '10 штук',
      },
    },
    {
      title: 'Кешбэк по 500\u00A0₽',
      img: { url: prize4, width: 326, height: 148 },
      color: 'blue' as const,
      subtitle: {
        type: 'text' as const,
        value: '2000 штук',
      },
    },
  ],
};

export const getRaffleHowToConfig = (isWebviewPage: boolean) => ({
  scrollToId: 'RAFFLE_FAQ',
  steps: [
    {
      IconComponent: Calculations,
      linkAtStartOfTitle: isWebviewPage
        ? undefined
        : {
            text: 'Купите',
            url: 'main' as const,
          },
      title: `${isWebviewPage ? 'Купите' : ''} полис на сайте или в приложении Сравни`,
      subtitle: 'С\u00A019\u00A0февраля по\u00A026\u00A0апреля стоимостью от 2\u00A0000\u00A0₽',
    },
    {
      IconComponent: Check,
      title: 'Зарегистрируйте полис до\u00A026\u00A0апреля включительно',
      subtitle: 'На этой странице или по ссылке из письма (отправим после покупки)',
    },
    {
      IconComponent: PrizeCup,
      title: 'Смотрите итоги розыгрыша на этой странице 20\u00A0мая ',
      subtitle: 'Покажем победителей на этой странице, а также свяжемся с ними',
    },
  ],
});

export const RaffleCalculationWidgetConfig = {
  subtitle: 'В розыгрыше участвуют полисы, которые были оформлены после 19 февраля и до 26 апреля включительно',
};

export const RaffleWinnersConfig = {
  subtitle: '20 мая в 16:00 МСК проведем трансляцию, где выберем победителей',
};

export const RaffleFAQConfig = [
  {
    title: 'Кто может участвовать в акции?',
    text: 'В розыгрыше участвуют Страхователи (те, кто оформил полис с 19 февраля по 26 апреля (включительно)). При регистрации необходимо ввести тот номер телефона, который был указан при оформлении страховки',
  },
  {
    title: 'Кто получит выигрыш?',
    text: 'Выигрыш получит тот, кто указан страхователем в полисе, который был зарегистрирован. Например, вы купили полис другу, и зарегистрировали его. По договору страхователем указан он, тогда, в случае выигрыша, приз получит ваш друг',
  },
  {
    title: 'Какие условия розыгрыша?',
    text: 'Для участия в акции необходимо оформить полис на сумму не менее 2 000 ₽ в период с 19 февраля по 26 апреля (включительно). Один номер телефона может быть использован для регистрации не более двух полисов при условии, что он совпадает с номером, указанным при оформлении полиса',
  },
  {
    title: 'Какие сроки проведения акции?',
    text: 'Полис необходимо купить и зарегистрировать на сайте или в приложении Сравни с 19 февраля по 26 апреля включительно (23:59 по московскому времени). Победители акции будут объявлены 20 мая',
  },
  {
    title: 'Как я узнаю, что стал победителем?',
    text: 'Всех победителей мы укажем на этой странице. Кроме того, каждому победителю будет отправлено письмо на почту  ',
  },
  {
    title: 'Как и в какой срок я смогу получить приз в случае выигрыша?',
    text: 'После объявления результатов приз будет отправлен победителю в течение 2 недель. Точный срок доставки будет зависеть от адреса получателя и габаритов приза. Все затраты на доставку мы возьмём на себя',
  },
];

export const RaffleRulesConfig = [
  {
    type: 'text' as const,
    text: 'Стимулирующее мероприятие (Акция) по розыгрышу призов (Три автомобиля, один миллион рублей, десять мобильных телефонов, две тысячи кешбэков,) за оформление страхового продукта стоимостью не менее 2 000 ₽ рублей на сайте ',
  },
  {
    type: 'link' as const,
    text: 'Sravni.ru',
    url: 'https://www.sravni.ru/',
  },
  {
    type: 'text' as const,
    text: ' для физических лиц, выполнивших правила Акции. Сроки проведения: с 19.02.2024 по 20.05.2024. Подробнее об организаторе, Акции, правилах и условиях на странице «',
  },
  {
    type: 'link' as const,
    text: 'Правила акции',
    url: RULES_LINK,
  },
  {
    type: 'text' as const,
    text: '». ООО «Сравни.ру» предоставляет услуги по подбору страхового продукта, выпуск страхового полиса осуществляет страхования компания. Изображение представлено для примера, Организатор акции не гарантирует полное совпадение внешнего вида и технических характеристик приза с представленным изображением',
  },
];
