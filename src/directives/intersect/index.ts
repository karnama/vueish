import type { Directive, DirectiveBinding, DirectiveHook } from 'vue';
import type { IntersectArgument, IntersectCallback, IntersectObject } from 'types';

interface ElementToObserve extends Element {
    _intersectionObserver?: {
        initiated: boolean;
        observer: IntersectionObserver;
    };
}

type Modifiers = Omit<IntersectObject, 'callback' | 'root' | 'rootMargin' | 'threshold'>;

// todo - modifiers for enter,leave
const setUpObserver: DirectiveHook = (
    el: ElementToObserve,
    binding: DirectiveBinding<IntersectArgument>
) => {
    // remove if already exists
    if ('_intersectionObserver' in el) {
        unbindObserver(el);
    }

    if (typeof binding.value === 'function') {
        el._intersectionObserver = {
            initiated: false,
            observer: new IntersectionObserver((entries) => {
                const entry = entries.find(e => e.isIntersecting);
                const modifiers = binding.modifiers as Modifiers;

                const cb = modifiers.idle
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    ? () => requestIdleCallback(() => (binding.value as IntersectCallback)(!!entry, entry))
                    : () => (binding.value as IntersectCallback)(!!entry, entry);

                // callback runs on setup so push to the next event cycle
                initiate(el);

                if (el._intersectionObserver?.initiated) {
                    cb();

                    if (binding.modifiers.once) {
                        unbindObserver(el);
                    }
                }
            })
        };
    } else {
        const enter = binding.value.hasOwnProperty('enter') ? !!binding.value.enter : binding.modifiers.enter;
        const leave = binding.value.hasOwnProperty('leave') ? !!binding.value.leave : binding.modifiers.leave;
        const idle = binding.value.hasOwnProperty('idle') ? !!binding.value.idle : binding.modifiers.idle;
        const once = binding.value.hasOwnProperty('once') ? !!binding.value.once : binding.modifiers.once;
        const { callback, threshold, root, rootMargin } = binding.value;

        if (Array.isArray(threshold) && once) {
            throw new Error('Specifying multiple \'threshold\' values with the \'once\' option enabled, is invalid.');
        }

        el._intersectionObserver = {
            initiated: false,
            observer: new IntersectionObserver((entries) => {
                const entry = entries.find(e => e.isIntersecting);

                const cb = idle
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    ? () => requestIdleCallback(() => void callback(!!entry, entry))
                    : () => void callback(!!entry, entry);

                // callback runs on setup so push to the next event cycle
                initiate(el);

                if (el._intersectionObserver?.initiated) {
                    cb();

                    if (binding.modifiers.once) {
                        unbindObserver(el);
                    }
                }
            }, {
                threshold,
                root,
                rootMargin
            })
        };
    }

    el._intersectionObserver.observer.observe(el);
};

/**
 * Set the initiated attribute to true at the first given opportunity.
 *
 * @param {ElementToObserve} el
 */
const initiate = (el: ElementToObserve) => {
    setTimeout(() => {
        if (el._intersectionObserver) {
            el._intersectionObserver.initiated = true;
        } else {
            initiate(el);
        }
    }, 0);
};

const unbindObserver = (el: ElementToObserve) => {
    el._intersectionObserver?.observer.unobserve(el);
    delete el._intersectionObserver;
};

export default {
    mounted: setUpObserver,
    updated: setUpObserver,
    unmounted: unbindObserver
} as Directive;
