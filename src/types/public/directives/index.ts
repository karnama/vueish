export interface IntersectCallback {
    (isIntersecting: boolean): void;
}

export interface IntersectObject extends IntersectionObserverInit {
    callback: IntersectCallback;
    once?: boolean;
}

export type IntersectArgument = IntersectCallback | IntersectObject;
