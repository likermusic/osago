import { ThemeName } from '@sravni/design-system-theme';
import type { ThemeNames } from '@sravni/design-system-theme';
import CriticalCssHead from '@sravni/nextjs-utils/lib/components/CriticalCssHead';
import Document, { Html, Main, NextScript } from 'next/document';
import type { DocumentInitialProps } from 'next/document';
import React from 'react';

type ExtendedDocumentInitialProps = DocumentInitialProps & {
  theme: ThemeNames;
};

class MyDocument extends Document<ExtendedDocumentInitialProps> {
  static async getInitialProps(ctx: App.ExtendedContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      theme: ctx.req.__THEME__ || ThemeName.lager,
    };
  }

  render() {
    const { theme } = this.props;

    return (
      <Html
        lang="ru"
        data-theme={theme}
      >
        <CriticalCssHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
