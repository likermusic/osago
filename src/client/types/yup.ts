import type { AnySchema } from 'yup';

export type Shape<T> = Record<keyof T, AnySchema>;
