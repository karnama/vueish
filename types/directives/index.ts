export interface IntersectCallback {
    (isIntersecting: boolean, entry?: IntersectionObserverEntry): void;
}

export interface IntersectObject extends IntersectionObserverInit {
    callback: IntersectCallback;
    once?: boolean;
    idle?: boolean;
    enter?: boolean;
    leave?: boolean;
}

export type IntersectArgument = IntersectCallback | IntersectObject;
