<template>
    <button type="button"
            :class="classes"
            class="vue-ui-button rounded px-4 transition disabled:cursor-not-allowed disabled:opacity-50">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { StyleType } from '@/types';
import { type } from '@composables/style';
import { label } from '@composables/input';

const primaryTypeClasses = {
    default: 'hover:bg-gray-200 bg-gray-300 disabled:bg-gray-300',
    primary: 'text-white bg-blue-600 hover:bg-blue-400 disabled:bg-blue-600',
    info: 'text-white bg-blue-400 hover:bg-blue-300 disabled:bg-blue-400',
    success: 'text-white bg-green-400 hover:bg-green-300 disabled:bg-green-400',
    warning: 'text-white bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400',
    danger: 'text-white bg-red-400 hover:bg-red-300 disabled:bg-red-400',
    brand: 'text-white bg-brand-400 hover:bg-brand-300 disabled:bg-brand-400'
} as { [key in StyleType]: string; };

const outlineTypeClasses = {
    default: 'hover:bg-gray-200 bg-gray-300 disabled:bg-gray-300',
    primary: 'text-white bg-blue-600 hover:bg-blue-400 disabled:bg-blue-600',
    info: 'text-white bg-blue-400 hover:bg-blue-300 disabled:bg-blue-400',
    success: 'text-white bg-green-400 hover:bg-green-300 disabled:bg-green-400',
    warning: 'text-white bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400',
    danger: 'text-white bg-red-400 hover:bg-red-300 disabled:bg-red-400',
    brand: 'text-white bg-brand-400 hover:bg-brand-300 disabled:bg-brand-400'
} as { [key in StyleType]: string; };

export default defineComponent({
    name: 'UIButton',

    props: {
        outline: {
            type: Boolean,
            default: false
        },

        secondary: {
            type: Boolean,
            default: false
        },

        ternary: {
            type: Boolean,
            default: false
        },

        label,
        type
    },

    setup(props) {
        const classes = computed(() => {
            const type = props.type as StyleType;
            if (props.outline) {
                return outlineTypeClasses[type];
            }
            return primaryTypeClasses[type];
        });

        return { classes };
    }
});
</script>

<style scoped>
.vue-ui-button {
    min-width: 110px;
    min-height: 35px;
}
</style>
