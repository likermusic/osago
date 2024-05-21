const { CDN } = require('@sravni/server-utils/lib/cdn');

const cdn = new CDN({
  s3Endpoint: process.env.S3_ENDPOINT,
  s3Bucket: process.env.S3_BUCKET,
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID,
  s3PublicPath: process.env.S3_PUBLIC_PATH,
});

cdn.uploadFolder('.next/static', process.env.SERVICE_NAME);
