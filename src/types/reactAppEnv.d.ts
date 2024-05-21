declare module '*.png' {
  // eslint-disable-next-line init-declarations
  const value: any;
  export default value;
}

declare module '*.svg' {
  // eslint-disable-next-line init-declarations
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
