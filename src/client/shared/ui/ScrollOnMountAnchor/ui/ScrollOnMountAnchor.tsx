import type { FC } from 'react';
import React from 'react';

import { FIRST_RENDER_SCROLL_ELEMENT_ID } from '../config';

/**
 * Бизнес хочет скролить к определенному блоку только при определенном условии
 * Этот элемент просто добавляет на странице якорь, который срабатывает только если в урле указан хэш скролла
 * Тогда мы сможем скролить на выдачу, если пользак перешел с анкеты, а если не с анкеты то просто аставлять его на саммари
 * */
export const ScrollOnMountAnchor: FC = ({ children }) => <div id={FIRST_RENDER_SCROLL_ELEMENT_ID}>{children}</div>;
