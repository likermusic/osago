import Head from 'next/head';
import { useRouter } from 'next/router';

import { useAppSelector } from 'shared/lib/redux';

import { metadataSelector, formatSeoText } from 'entities/metadata';

export function Seo() {
  const { pathname } = useRouter();
  const metadata = useAppSelector(metadataSelector);

  if (!metadata || !(metadata.title && metadata.description)) {
    return null;
  }

  return (
    <Head>
      <title>{formatSeoText(metadata.title)}</title>
      <meta
        name="description"
        content={metadata.description}
      />
      <link
        rel="canonical"
        href={metadata.canonical || `https://www.sravni.ru${pathname}/`}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:description"
        content={metadata.ogDescription}
      />
      <meta
        property="og:title"
        content={metadata.ogTitle}
      />
      <meta
        property="og:image"
        content="https://f.sravni.ru/f/_/logo_200x200.jpg"
      />
      <meta
        property="og:image:width"
        content="200"
      />
      <meta
        property="og:image:height"
        content="200"
      />
      {metadata.schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.schema) }}
        />
      ) : null}
    </Head>
  );
}
