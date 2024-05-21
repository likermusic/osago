import React from 'react';

export const WLCustomTheme = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
          body {
            background-color: initial !important;
          }
          `,
    }}
  />
);
