import type { Directive, DirectiveBinding } from 'vue';

export default {
    mounted: (el: Element, binding: DirectiveBinding<string>) => {
        el.insertAdjacentHTML('afterend', binding.value);
    },
    updated: (el: Element, binding: DirectiveBinding<string>) => {
        // console.log(el.nextElementSibling!.outerHTML);
        // console.log(binding.value);
        el.nextElementSibling!.outerHTML = binding.value;
    }
} as Directive;
