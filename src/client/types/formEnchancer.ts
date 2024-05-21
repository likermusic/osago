export type InferComponentProps<HOC> = HOC extends (component: React.ComponentType<infer P>) => any ? P : never;
