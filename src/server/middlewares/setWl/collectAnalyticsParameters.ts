import { WL_QUERY_PARAMS } from '../../../constants';

export const collectAnalyticsParameters = (ctx: App.ExtendedContext, partnerId?: number) => ({
  affId: partnerId,
  affSub1: ctx.query[WL_QUERY_PARAMS.affSub1] as string | undefined,
  affSub2: ctx.query[WL_QUERY_PARAMS.affSub2] as string | undefined,
  affSub3: ctx.query[WL_QUERY_PARAMS.affSub3] as string | undefined,
  affSub4: ctx.query[WL_QUERY_PARAMS.affSub4] as string | undefined,
  affSub5: ctx.query[WL_QUERY_PARAMS.affSub5] as string | undefined,
  offerId: ctx.query[WL_QUERY_PARAMS.offerId],
  sourceId: ctx.query[WL_QUERY_PARAMS.source] as string | undefined,
  transactionId: ctx.query[WL_QUERY_PARAMS.transactionId] as string | undefined,
  themePalette: ctx.query[WL_QUERY_PARAMS.themePalette] as string | undefined,
  isFullLanding: ctx.query[WL_QUERY_PARAMS.layout] === 'full',
  isQuestionnaireOnLanding:
    ctx.query[WL_QUERY_PARAMS.isQuestionnaireOnLanding] === 'true' ||
    // по умолчанию показываем секцию вопросов
    ctx.query[WL_QUERY_PARAMS.isQuestionnaireOnLanding] === undefined,
});
