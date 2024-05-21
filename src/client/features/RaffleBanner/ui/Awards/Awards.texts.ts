import awardCar from '../../assets/awardCar3.png';
import awardCashback from '../../assets/awardCashback.png';
import awardIpones from '../../assets/awardIphones.png';
import awardMoney from '../../assets/awardMoney.png';

export const awards = [
  {
    name: 'Три Geely Coolray',
    badgeText: 'Главный приз',
    image: awardCar,
    imageAlt: 'Автомобиль для победителя',
    awardStyle: 'awardCar',
  },
  {
    name: 'Один миллион рублей',
    badgeText: 'Главный приз',
    image: awardMoney,
    imageAlt: 'Один миллион рублей для победителя',
    awardStyle: 'awardMillion',
  },
  {
    name: 'Apple iPhone 15',
    badgeText: '10 штук',
    image: awardIpones,
    imageAlt: 'Iphone 15 для победителей',
    awardStyle: 'awardIphones',
  },
  {
    name: 'Кешбэк по 500 ₽',
    badgeText: '2000 штук',
    image: awardCashback,
    imageAlt: 'cashback для победителей',
    awardStyle: 'awardCashback',
  },
];
