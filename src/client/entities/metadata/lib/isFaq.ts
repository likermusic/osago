import type { ContentBlocks, IFAQMeta } from '@sravni/types/lib/seo';

export const isFaq = (block: ContentBlocks[0]): block is IFAQMeta => block.type === 'faq';
