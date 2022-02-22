<template>
    <div class="flex ui-radio">
        <label class="relative flex items-center outline-none text-color">
            <input v-bind="$attrs"
                   type="radio"
                   :value="value"
                   tabindex="-1"
                   :disabled="disabled"
                   class="hidden">
            <span class="ui-radio-btn text-brand-500 relative float-left mr-2 h-5 w-5
                         border-2 rounded-full outline-none transition-colors"
                  role="radio" />
            <slot>
                {{ label }}
            </slot>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { label, disabled } from '@/shared-props';

export default defineComponent({
    name: 'UIRadio',

    inheritAttrs: false,

    props: {
        value: {
            type: [String, Boolean, Array, Object, Number],
            required: true
        },

        label,
        disabled
    }
});
</script>

<style lang="scss" scoped>
.ui-radio-btn:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: currentColor;
    transform: scale(0);
    transition: all .2s ease;
    opacity: .08;
    pointer-events: none;
}

label {
    cursor: pointer;

    &.disabled {
        cursor: not-allowed;

        .ui-radio-btn:after {
            background: theme('colors.gray.500');
        }
    }
}

input:checked + .ui-radio-btn:after {
    transform: scale(1) !important;
    transition: all .2s cubic-bezier(.35, .9, .4, .9);
    opacity: 1;
}

input:checked:enabled + .ui-radio-btn {
    border-color: currentColor;
}

label:hover input:enabled > .ui-radio-btn:after {
    transform: scale(3.6);
}

label:focus > input:enabled + .ui-radio-btn {
    border-color: currentColor;
}
</style>
