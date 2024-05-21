import type React from 'react';

export type TActiveElementClickInterceptor = React.MouseEvent<HTMLDivElement> & { isActiveElement?: boolean };
