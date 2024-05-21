import { Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

export type TRaffleRulesProps = {
  texts: Array<
    | {
        text: string;
        type: 'text';
      }
    | {
        text: string;
        url: string;
        type: 'link';
      }
  >;
};

export const RaffleRules: FC<TRaffleRulesProps> = ({ texts, className }) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn({ 'h-pt-40 h-pb-40': !isMobile, 'h-pt-32 h-pb-32': isMobile }, className)}>
      <Typography.Text
        size={12}
        className="h-color-D60"
      >
        {texts.map((textConfig) =>
          textConfig.type === 'text' ? (
            textConfig.text
          ) : (
            <Typography.Link
              key={textConfig.text}
              href={textConfig.url}
              target="_blank"
            >
              {textConfig.text}
            </Typography.Link>
          ),
        )}
      </Typography.Text>
    </div>
  );
};
