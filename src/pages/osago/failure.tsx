import type { NextPageContext } from 'next';

import type { IFailurePageProps } from 'pageModules/FailurePage';
import { FailurePage } from 'pageModules/FailurePage';

export default FailurePage;

FailurePage.getInitialProps = async (ctx: NextPageContext): Promise<IFailurePageProps> => ({
  orderHash: ctx.query.orderHash as string,
});
