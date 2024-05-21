const isClient = typeof window !== 'undefined';
type TNoSSR = {
  children: JSX.Element;
};

export const NoSSR = ({ children }: TNoSSR) => {
  if (!children) {
    return null;
  }

  return isClient ? children : null;
};
