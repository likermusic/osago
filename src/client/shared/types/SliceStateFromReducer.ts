import type { Slice } from '@reduxjs/toolkit';

export type SliceStateFromReducer<T extends Slice> = {
  [TKey in T['name']]: ReturnType<T['reducer']>;
};
