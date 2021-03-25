import type { Directive, DirectiveBinding } from 'vue';

export default {
    mounted: (el: Element, binding: DirectiveBinding<string>) => {
        el.insertAdjacentHTML('afterend', binding.value);

        // if (el.tagName === 'TEMPLATE') {
        //     el.parentElement?.removeChild(el);
        // }
    },
    beforeUpdate: (el, binding) => console.log(binding.value)
} as Directive;
