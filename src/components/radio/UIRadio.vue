<template>
    <div class="flex items-center ui-radio">
        <input v-bind="$attrs"
               type="radio"
               :value="value"
               tabindex="-1"
               :disabled="disabled"
               class="hidden">
        <label class="relative flex items-center">
            <span class="ui-radio-btn relative float-left mr-2 h-5 w-5 border-2 rounded-full outline-none"
                  role="radio" />
            <slot>
                {{ label }}
            </slot>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { label, value, disabled } from '@composables/input';

export default defineComponent({
    name: 'UIRadio',

    inheritAttrs: false,

    props: {
        label,
        value,
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
    background: theme('colors.blue.500');
    transform: scale(0);
    transition: all .2s ease;
    opacity: .08;
    pointer-events: none;
}

input:disabled + label {
    cursor: not-allowed;
    & > .ui-radio-btn:after {
        background: theme('colors.gray.500');
    }
}

input:checked + label > .ui-radio-btn:after {
    transform: scale(1) !important;
    transition: all .2s cubic-bezier(.35, .9, .4, .9);
    opacity: 1;
}

input:checked:enabled + label > .ui-radio-btn {
    border-color: theme('colors.blue.500');
}

.ui-radio-btn:focus {
    border-color: theme('colors.blue.500');
}

input:enabled + label:hover > .ui-radio-btn:after {
    transform: scale(3.6);
}

input:enabled + label {
    cursor: pointer;
}
</style>
