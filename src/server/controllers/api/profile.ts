import { postPeople } from '../../services/profile';

export const postPeopleController = async (ctx: App.ExtendedContext) => {
  ctx.body = await postPeople(ctx.user.access_token);
};
