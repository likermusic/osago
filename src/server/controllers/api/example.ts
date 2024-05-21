import * as service from '../../services/example';

export const exampleApiController = async (ctx: App.ExtendedContext) => {
  ctx.body = await service.find();
};
