import { ErrorBoundary } from 'react-error-boundary';

import { sendSentryClientError } from 'shared/lib/sendSentryClientError';

import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';

export const ErrorBoundaryWithFallback: FC = ({ children }) => (
  <ErrorBoundary
    fallbackRender={ErrorBoundaryFallback}
    onError={(error: Error, info: { componentStack: string }) =>
      sendSentryClientError(error, { ...info, ErrorBoundaryId: 'Component' }, { level: 'fatal' })
    }
  >
    {children}
  </ErrorBoundary>
);
