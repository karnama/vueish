<template>
    <div class="ui-radio" :class="$attrs.class">
        <label class="cursor-pointer relative flex items-center">
            <input v-bind="$attrs"
                   ref="input"
                   type="radio"
                   :value="value"
                   class="hidden"
                   @input="$emit('update:modelValue', $event.target.value)">
            <span class="label relative float-left mr-2 h-5 w-5 border-2 rounded-full" />
            {{ label }}
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { label } from '@composables/input/input';

export default defineComponent({
    name: 'UIRadio',

    inheritAttrs: false,

    props: {
        label,
        value: [String, Boolean, Array, Object, Number]
    },

    emits: ['update:modelValue']
});
</script>

<style lang="scss" scoped>
.ui-radio {
    .label:after {
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


    label:hover input:enabled + .label:after {
        transform: scale(3.6);
    }

    input:disabled + .label:after {
        background: theme('colors.gray.500');
    }

    input:checked + .label:after {
        transform: scale(1) !important;
        transition: all .2s cubic-bezier(.35, .9, .4, .9);
        opacity: 1;
    }

    input:checked:enabled + .label {
        border-color: theme('colors.blue.500');
    }
}
</style>
