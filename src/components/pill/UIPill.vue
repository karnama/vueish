<template>
    <span :class="classes" class="rounded px-2">
        <slot>
            {{ label }}
        </slot>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { label } from '@composables/input';
import { type } from '@composables/style';
import { StyleType } from '@/types';

const typeClasses = {
    default: 'text-gray-700 bg-gray-200',
    primary: 'text-blue-600 bg-blue-100',
    info: 'text-blue-700 bg-blue-200',
    success: 'text-green-700 bg-green-200',
    warning: 'text-yellow-700 bg-yellow-200',
    danger: 'text-red-700 bg-red-200',
    brand: 'text-brand-700 bg-brand-200'
} as { [key in StyleType]: string; };

export default defineComponent({
    name: 'UIBadge',

    props: {
        type,
        label
    },

    setup(props) {
        const classes = computed(() => typeClasses[props.type as StyleType]);

        return { classes };
    }
});
</script>
