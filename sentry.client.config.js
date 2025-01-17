import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.ENVIRONMENT;

Sentry.init({
  environment: ENVIRONMENT,
  dsn: SENTRY_DSN,
  // Adjust this value in production, or use tracesSampler for greater control
  sampleRate: 1,
  ignoreErrors: [],

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
