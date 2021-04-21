import type { Directive, DirectiveBinding, DirectiveHook } from 'vue';
import { IntersectArgument, IntersectCallback } from '@/types';

interface ElementToObserve extends Element {
    _intersectionObserver?: {
        initiated: boolean;
        observer: IntersectionObserver;
    };
}

const setUpObserver: DirectiveHook = (
    el: ElementToObserve,
    binding: DirectiveBinding<IntersectArgument>
) => {
    // remove if already exists
    if ('_intersectionObserver' in el) {
        unbindObserver(el);
    }

    // todo - multiple thresholds with once?

    if (typeof binding.value === 'function') {
        el._intersectionObserver = {
            initiated: false,
            observer: new IntersectionObserver((entries) => {
                const entry = entries.find(e => e.isIntersecting);

                binding.modifiers.idle
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    ? requestIdleCallback(() => (binding.value as IntersectCallback)(!!entry, entry))
                    : (binding.value as IntersectCallback)(!!entry, entry);
                // callback runs on setup so push to the next event cycle
                initiate(el);

                if (binding.modifiers.once && el._intersectionObserver?.initiated) {
                    unbindObserver(el);
                }
            })
        };
    } else {
        const idle = binding.value.hasOwnProperty('idle') ? !!binding.value.idle : binding.modifiers.idle;
        const once = binding.value.hasOwnProperty('once') ? !!binding.value.once : binding.modifiers.once;
        const { callback, threshold, root, rootMargin } = binding.value;

        el._intersectionObserver = {
            initiated: false,
            observer: new IntersectionObserver((entries) => {
                const entry = entries.find(e => e.isIntersecting);

                idle
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    ? requestIdleCallback(() => callback(!!entry, entry))
                    : callback(!!entry, entry);
                // callback runs on setup so push to the next event cycle
                initiate(el);

                if (once && el._intersectionObserver && el._intersectionObserver?.initiated) {
                    unbindObserver(el);
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
