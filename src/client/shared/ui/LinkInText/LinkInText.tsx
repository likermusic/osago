import { Typography } from '@sravni/react-design-system';
import { useCallback } from 'react';

interface ILinkInText {
  linkId: string;
  linkPlace: string;
  text: string;
  onLinkClicked: (linkId: string) => void;
}

/**
 * Компонент оборачивает часть текста ссылкой на которую можно нажать
 * Компонент не обернут в типографику, чтобы не прокидывать лишние пропсы.
 * */
export const LinkInText: FC<ILinkInText> = ({ linkId, text, onLinkClicked, linkPlace }) => {
  const handleLinkClick = useCallback(() => onLinkClicked(linkId), [linkId, onLinkClicked]);

  const [textBefore, textAfter] = text.split(linkPlace);

  return (
    <>
      {textBefore}
      <Typography.Link onClick={handleLinkClick}>{linkPlace}</Typography.Link>
      {textAfter}
    </>
  );
};
