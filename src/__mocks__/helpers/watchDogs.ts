import * as react from '@testing-library/react';
import * as hooks from '@testing-library/react-hooks';

export async function waitForHookEffect() {
  await hooks.act(async () => {
    await Promise.resolve();
  });
}

export async function waitForAsyncEffect() {
  await Promise.resolve();
}

export async function waitForReactEffect() {
  await react.act(async () => {
    await Promise.resolve();
  });
}
