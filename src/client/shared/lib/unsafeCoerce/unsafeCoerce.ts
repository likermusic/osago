/**
 * Типобезопасное приведение типов. TS не будет забивать на тайпчек,
 * до и после приведения например когда исходный тип поменялся.
 * Usage:
 * unsafeCoerce<React.ForwardedRef<HTMLElement>, React.ForwardedRef<HTMLDivElement>>(ref)
 */
export const unsafeCoerce = <A, B>(a: A): B => a as unknown as B;
