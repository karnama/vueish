import type { Directive, DirectiveBinding, DirectiveHook } from 'vue';
import { IntersectArgument, IntersectCallback } from '@/types';

interface ElementToObserve extends Element {
    _observer?: {
        initiated: boolean;
        observer: IntersectionObserver;
    };
}

const setUpObserver: DirectiveHook = (
    el: ElementToObserve,
    binding: DirectiveBinding<IntersectArgument>
) => {
    // remove if already exists
    if ('_observer' in el) {
        unbindObserver(el);
    }

    // requestIdleCallback?
    if (typeof binding.value === 'function') {
        const once = binding.modifiers.hasOwnProperty('once') ? binding.modifiers.once : false;

        el._observer = {
            initiated: false,
            observer: new IntersectionObserver((entries) => {
                (binding.value as IntersectCallback)(!!entries.find(e => e.isIntersecting));
                // callback runs on setup so push to the next event cycle
                initiate(el);

                if (once && el._observer?.initiated) {
                    unbindObserver(el);
                }
            })
        };
    } else {
        const once = binding.value.hasOwnProperty('once')
            ? !!binding.value.once
            : binding.modifiers.hasOwnProperty('once') ? binding.modifiers.once : false;
        const { callback, threshold, root, rootMargin } = binding.value;

        el._observer = {
            initiated: false,
            observer: new IntersectionObserver((entries) => {
                callback(!!entries.find(e => e.isIntersecting));
                initiate(el);

                if (once && el._observer && el._observer?.initiated) {
                    unbindObserver(el);
                }
            }, {
                threshold,
                root,
                rootMargin
            })
        };
    }

    el._observer.observer.observe(el);
};

/**
 * Set the initiated attribute to true at the first given opportunity.
 *
 * @param {ElementToObserve} el
 */
const initiate = (el: ElementToObserve) => {
    setTimeout(() => {
        if (el._observer) {
            el._observer.initiated = true;
        } else {
            initiate(el);
        }
    }, 0);
};

const unbindObserver = (el: ElementToObserve) => {
    el._observer?.observer.unobserve(el);
    delete el._observer;
};

export default {
    mounted: setUpObserver,
    updated: setUpObserver,
    unmounted: unbindObserver
} as Directive;
