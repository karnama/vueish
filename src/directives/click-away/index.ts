import type { Directive, DirectiveBinding } from 'vue';

let eventType: 'touchstart' | 'click' = 'click';
const listenerKey = '_click_away_listener';

type ClickAwayElement = Element & { [listenerKey]?: undefined | EventListenerObject };

export const initialiseClickAway = (el: ClickAwayElement, binding: DirectiveBinding<typeof Function>): void => {
    removeClickAway(el);
    createClickAwayListener(el, binding);
    addClickAway(el);
};

export const createClickAwayListener = (el: ClickAwayElement, binding: DirectiveBinding<typeof Function>): void => {
    const cb = binding.value;
    let nextTick = false;
    setTimeout(() => { nextTick = true; }, 0);
    eventType = document.ontouchstart ? 'touchstart' : 'click';

    el[listenerKey] = {
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

export const addClickAway = (el: ClickAwayElement): void => {
    if (!el[listenerKey]) return;
    document.addEventListener(eventType, el[listenerKey]!);
};

export const removeClickAway = (el: ClickAwayElement): void => {
    if (!el[listenerKey]) return;
    document.removeEventListener(eventType, el[listenerKey]!);
    delete el[listenerKey];
};

export const updateClickAway = (el: ClickAwayElement, binding: DirectiveBinding<typeof Function>): void => {
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
