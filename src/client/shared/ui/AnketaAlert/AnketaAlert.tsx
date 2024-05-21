import { Alert, Typography } from '@sravni/react-design-system';

interface IAnketaAlert {
  title: string;
  subtitle: string;
}

export const AnketaAlert: FC<IAnketaAlert> = ({ title, subtitle }) => (
  <Alert
    color="orange"
    title={<Typography.Text strong>{title}</Typography.Text>}
    subtitle={subtitle}
  />
);
