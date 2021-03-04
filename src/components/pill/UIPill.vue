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
    default: 'input-gray-700 bg-gray-200',
    primary: 'input-blue-600 bg-blue-100',
    info: 'input-blue-700 bg-blue-200',
    success: 'input-green-700 bg-green-200',
    warning: 'input-yellow-700 bg-yellow-200',
    danger: 'input-red-700 bg-red-200',
    brand: 'input-brand-700 bg-brand-200'
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
