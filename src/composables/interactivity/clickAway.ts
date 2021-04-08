import type { Directive, DirectiveBinding } from 'vue';

let eventType: 'touchstart' | 'click' = 'click';

let listener: undefined | EventListenerObject;

export const initialiseClickAway = (el: Element, binding: DirectiveBinding<typeof Function>): void => {
    removeClickAway();
    createClickAwayListener(el, binding);
    addClickAway();
};

export const createClickAwayListener = (el: Element, binding: DirectiveBinding<typeof Function>): void => {
    const cb = binding.value;
    let nextTick = false;
    setTimeout(() => { nextTick = true; }, 0);
    eventType = document.ontouchstart ? 'touchstart' : 'click';

    listener = {
        handleEvent(event: UIEvent) {
            if (binding.modifiers.stop) {
                event.stopPropagation();
            }

            if (binding.modifiers.prevent) {
                event.preventDefault();
            }

            if ((!el || !el.contains(event.target as Node)) && nextTick && cb && typeof cb === 'function') {
                return cb.call(event);
            }
        }
    };
};

export const addClickAway = (): void => {
    if (!listener) return;
    document.addEventListener(eventType, listener);
};

export const removeClickAway = (): void => {
    if (!listener) return;
    document.removeEventListener(eventType, listener);
};

export const updateClickAway = (el: Element, binding: DirectiveBinding<typeof Function>): void => {
    if (binding.value === binding.oldValue) {
        return;
    }

    initialiseClickAway(el, binding);
};

export default {
    mounted: initialiseClickAway,
    updated: updateClickAway,
    unmounted: removeClickAway
} as Directive;
