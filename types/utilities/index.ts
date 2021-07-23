export type MaybeArray<T> = T | T[];

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
