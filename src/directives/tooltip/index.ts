import type { Directive, DirectiveBinding } from 'vue';

const x = ['left', 'right'] as const;
const y = ['top', 'bottom'] as const;

function updateElement(el: Element, binding: DirectiveBinding<unknown>): void {
    if (binding.value === '' || binding.value === undefined) {
        el.removeAttribute('data-v-tooltip');
    } else {
        el.setAttribute('data-v-tooltip', String(binding.value));
    }


    Object.keys(binding.modifiers).forEach(position => {
        const pos = position.toLowerCase();

        if (x.includes(pos as typeof x[number])) {
            el.setAttribute('data-v-tooltip-x-position', position);
            return;
        }

        if (y.includes(pos as typeof y[number])) {
            el.setAttribute('data-v-tooltip-y-position', position);
            return;
        }
    });

    if (!el.hasAttribute('data-v-tooltip-y-position') && !el.hasAttribute('data-v-tooltip-x-position')) {
        el.setAttribute('data-v-tooltip-y-position', 'top');
    }
}

export default {
    created: updateElement,
    mounted: updateElement,
    updated: updateElement
} as Directive;
