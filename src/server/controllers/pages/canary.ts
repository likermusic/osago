export async function canaryController(ctx: App.ExtendedContext): Promise<void> {
  ctx.cookies?.set('sravni_canary', 'always', { path: '/', sameSite: 'strict' });
  ctx.redirect('https://www.sravni.ru/osago/');
}
