import { requestAssignUserIdPost } from '../../services/user';

export const postAssignUserId = async (ctx: App.ExtendedContext) => {
  const query = ctx.request.body;

  ctx.body = await requestAssignUserIdPost(query);
};

export const userInfo = async (ctx: App.ExtendedContext) => {
  // __USER__ уже отформатирован в мидлваре setUser его можно безопасно передавать на клиент
  ctx.body = ctx.req.__USER__;
};
