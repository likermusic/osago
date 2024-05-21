import { Avatar, Icon, Space, Typography, Accordion } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { DocumentIcon } from 'shared/assets';
import type { CrossTypes } from 'shared/config/cross';
import { AccordionTitle } from 'shared/ui/AccordionTitle';

import { ExceptionIcon } from '../../assets';

import styles from './Info.module.scss';
import { InfoTexts } from './Info.texts';

const { Link, Text } = Typography;
interface IInfo {
  documents: Array<{
    id: string;
    name: string;
    description: string;
    number: number;
    icon: string;
    file: string;
  }>;
  exceptions: Array<{
    id: string;
    name: string;
    description: string;
    number: number;
    icon: string;
  }>;
  steps: Array<{
    id: string;
    name: string;
    description: string;
    number: number;
  }>;
  type: CrossTypes;
}

export const Info: FC<IInfo> = ({ documents, exceptions, steps, type }) => {
  const isMobile = useIsMobile();

  return (
    <div>
      <Accordion
        title={
          (
            <AccordionTitle
              title={InfoTexts[type].list.title}
              subtitles={InfoTexts[type].list.subtitles}
            />
          ) as unknown as string
        }
        className={styles.tab}
      >
        <Space
          size={isMobile ? 16 : 24}
          direction="vertical"
          className={cn(styles.accordionContainer)}
        >
          {steps?.map((step, index) => (
            <Space
              size={12}
              key={step.id}
            >
              <Avatar size={44}>
                <Text className="h-color-B100">{index + 1}</Text>
              </Avatar>

              <Space
                direction="vertical"
                size={2}
              >
                <Text
                  className="h-mb-2"
                  size={14}
                  strong
                >
                  {step.name}
                </Text>

                {step.description && (
                  <Text
                    className="h-color-D60"
                    size={12}
                  >
                    {step.description}
                  </Text>
                )}
              </Space>
            </Space>
          ))}
        </Space>
      </Accordion>

      <Accordion
        title={
          (
            <AccordionTitle
              title={InfoTexts[type].exceptions.title}
              subtitles={InfoTexts[type].exceptions.subtitles}
            />
          ) as unknown as string
        }
        className={styles.tab}
      >
        <Space
          size={isMobile ? 16 : 24}
          direction="vertical"
          className={cn(styles.accordionContainer)}
        >
          {exceptions?.map((exception) => (
            <Space
              align="center"
              key={exception.id}
            >
              <Icon
                size={20}
                icon={<ExceptionIcon className={styles.iconColor} />}
                className="h-mr-8"
              />
              <Text size={14}>{exception.name}</Text>
            </Space>
          ))}
        </Space>
      </Accordion>

      <Accordion
        title={
          (
            <AccordionTitle
              title={InfoTexts[type].documents.title}
              subtitles={InfoTexts[type].documents.subtitles}
            />
          ) as unknown as string
        }
        className={styles.tab}
      >
        <Space
          size={isMobile ? 16 : 32}
          className={cn(styles.accordionContainer, styles.accordionContainerDocuments)}
        >
          {documents?.map((document) => (
            <Space
              align="center"
              key={document.name}
              className={styles.documentItem}
            >
              <Icon
                size={20}
                icon={<DocumentIcon />}
                className="h-mr-8"
              />

              <Text size={14}>
                <Link
                  href={document.file}
                  target="_blank"
                  color="black"
                >
                  <Text
                    size={16}
                    strong
                  >
                    {document.name}
                  </Text>
                </Link>
              </Text>
            </Space>
          ))}
        </Space>
      </Accordion>
    </div>
  );
};
