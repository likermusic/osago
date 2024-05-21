import { sendEventShareLinkClick } from 'shared/lib/sendGAEvents';

import TGLogo from '../../assets/Telegram.svg';
import VkLogo from '../../assets/VK.svg';
import WALogo from '../../assets/WhatsApp.svg';

export const ShareMediasConfig = [
  {
    title: 'Вконтакте',
    getLink: (inviteLink: string) => `https://vkontakte.ru/share.php?url=https://${inviteLink}`,
    Logo: VkLogo,
    sendEvent: () => sendEventShareLinkClick('VK'),
  },
  {
    title: 'Telegram',
    getLink: (inviteLink: string) => `https://t.me/share/url?url=https://${inviteLink}`,
    Logo: TGLogo,
    sendEvent: () => sendEventShareLinkClick('Telegram'),
  },
  {
    title: 'WhatsApp',
    getLink: (inviteLink: string) => `https://api.whatsapp.com/send?text=https://${inviteLink}`,
    Logo: WALogo,
    sendEvent: () => sendEventShareLinkClick('Whatsapp'),
  },
];
