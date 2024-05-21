import { Grid, Typography, Avatar, Space, Rate, Button } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

const { Text, Link } = Typography;

type RatingRowProps = {
  name: string;
  icon: string;
  rating: number;
  reviewsCount: number;
  answersCount: number;
  solvedCount: number;
  companyRatingDetailsLink: string;
};

export const RatingRow = ({
  companyRatingDetailsLink,
  name,
  rating,
  reviewsCount,
  solvedCount,
  answersCount,
  icon,
}: RatingRowProps) => {
  const isMobile = useIsMobile();

  return (
    <Grid.Row
      gutter={40}
      align="middle"
    >
      <Grid.Col span={isMobile ? 10 : 4}>
        <Space align="center">
          <Avatar
            size={36}
            src={icon}
          />
          <Link
            href={companyRatingDetailsLink}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="text"
              color="blue"
            >
              {name}
            </Button>
          </Link>
        </Space>
      </Grid.Col>

      <Grid.Col span={2}>
        <Space
          align="center"
          justify="start"
          size={4}
        >
          <Rate
            value={rating}
            count={1}
            size={16}
          />
          <Text>{rating}</Text>
        </Space>
      </Grid.Col>

      {!isMobile && (
        <>
          <Grid.Col span={2}>
            <Space justify="start">
              <Link
                href={`${companyRatingDetailsLink}otzyvy/?tag=osago`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="text"
                  color="blue"
                >
                  {reviewsCount ?? '-'}
                </Button>
              </Link>
            </Space>
          </Grid.Col>

          <Grid.Col span={2}>
            <Space justify="start">
              <Text>{answersCount ?? '-'}</Text>
            </Space>
          </Grid.Col>

          <Grid.Col span={2}>
            <Space justify="start">
              <Text>{solvedCount ?? '-'}</Text>
            </Space>
          </Grid.Col>
        </>
      )}
    </Grid.Row>
  );
};
