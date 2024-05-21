import type { ContentBlocks, IHtmlMeta } from '@sravni/types/lib/seo';

export const isHTML = (block: ContentBlocks[0]): block is IHtmlMeta => block.type === 'html';
