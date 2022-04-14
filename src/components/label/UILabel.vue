<template>
    <span :class="classes" class="rounded select-none">
        <slot>
            {{ label }}
        </slot>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { label, category } from '@/shared-props';
import type { StyleType } from 'types';

const primaryClasses = {
    default: 'bg-gray-600',
    primary: 'bg-blue-600',
    info: 'bg-blue-400',
    success: 'bg-green-600',
    warning: 'bg-yellow-500',
    danger: 'bg-red-600',
    brand: 'bg-brand-600'
} as { [key in StyleType]: string; };

const secondaryClasses = {
    default: 'text-gray-700 bg-gray-200',
    primary: 'text-blue-700 bg-blue-200',
    info: 'text-blue-500 bg-blue-100',
    success: 'text-green-700 bg-green-200',
    warning: 'text-yellow-700 bg-yellow-200',
    danger: 'text-red-700 bg-red-200',
    brand: 'text-brand-700 bg-brand-200'
} as { [key in StyleType]: string; };

export default defineComponent({
    name: 'UILabel',

    props: {
        /**
         * Apply the rounded classes
         *
         * @default false
         */
        rounded: {
            type: Boolean,
            default: false
        },

        /**
         * Apply the secondary styles.
         *
         * @default false
         */
        secondary: {
            type: Boolean,
            default: false
        },

        /**
         * Set styles sizing the label small.
         *
         * @default false
         */
        sm: {
            type: Boolean,
            default: false
        },

        category,
        label
    },

    setup(props) {
        const classes = computed(() => {
            let classes;

            if (props.secondary) {
                classes = secondaryClasses[props.category as StyleType];
            } else {
                classes = primaryClasses[props.category as StyleType]+ ' text-white';
            }

            if (props.sm) {
                classes += ' text-xs px-1.5 py-0.5';
            } else {
                classes += ' px-3 py-1 font-bold text-sm';
            }

            if (props.rounded) {
                classes += ' rounded-full';
            }

            return classes;
        });

        return { classes };
    }
});
</script>
