import type { Meta, StoryObj } from '@storybook/react';

import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';

const meta: Meta<typeof ErrorBoundaryFallback> = {
  title: 'Shared/ErrorBoundaryFallback',
  component: ErrorBoundaryFallback,
};

export default meta;
type Story = StoryObj<typeof ErrorBoundaryFallback>;

export const Main: Story = {
  args: {},
};
