import { Grid, Typography, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { RatingHeaderTexts } from './RatingHeader.texts';

const { Text } = Typography;

export const RatingHeader = () => {
  const isMobile = useIsMobile();
  return (
    <Grid.Row gutter={40}>
      <Grid.Col span={isMobile ? 10 : 4}>
        <Text
          className="h-color-D60"
          size={10}
        >
          {RatingHeaderTexts.name}
        </Text>
      </Grid.Col>

      <Grid.Col span={2}>
        <Space justify="start">
          <Text
            className="h-color-D60"
            size={10}
          >
            {RatingHeaderTexts.rating}
          </Text>
        </Space>
      </Grid.Col>

      {!isMobile && (
        <>
          <Grid.Col span={2}>
            <Space justify="start">
              <Text
                className="h-color-D60"
                size={10}
              >
                {RatingHeaderTexts.reviews}
              </Text>
            </Space>
          </Grid.Col>

          <Grid.Col span={2}>
            <Space justify="start">
              <Text
                className="h-color-D60"
                size={10}
              >
                {RatingHeaderTexts.answers}
              </Text>
            </Space>
          </Grid.Col>

          <Grid.Col span={2}>
            <Space justify="start">
              <Text
                className="h-color-D60"
                size={10}
              >
                {RatingHeaderTexts.solved}
              </Text>
            </Space>
          </Grid.Col>
        </>
      )}
    </Grid.Row>
  );
};
