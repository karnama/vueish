import type { Directive, DirectiveBinding } from 'vue';

export default {
    mounted: (el: Element, binding: DirectiveBinding<string>) => {
        el.insertAdjacentHTML('afterend', binding.value);
    }
} as Directive;
