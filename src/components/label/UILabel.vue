<template>
    <span :class="classes" class="rounded select-none">
        <slot>
            {{ label }}
        </slot>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { label, theme } from '@/shared-props';
import type { Theme } from 'types';

const primaryClasses = {
    slate: 'bg-slate-600',
    gray: 'bg-gray-600',
    zinc: 'bg-zinc-600',
    neutral: 'bg-neutral-600',
    stone: 'bg-stone-600',
    orange: 'bg-orange-600',
    amber: 'bg-amber-600',
    yellow: 'bg-yellow-600',
    lime: 'bg-lime-600',
    green: 'bg-green-600',
    emerald: 'bg-emerald-600',
    teal: 'bg-teal-600',
    cyan: 'bg-cyan-600',
    sky: 'bg-sky-600',
    blue: 'bg-blue-600',
    indigo: 'bg-indigo-600',
    violet: 'bg-violet-600',
    purple: 'bg-purple-600',
    fuchsia: 'bg-fuchsia-600',
    pink: 'bg-pink-600',
    rose: 'bg-rose-600',
    red: 'bg-red-600',
    brand: 'bg-brand-600',
    default: 'bg-gray-800'
} as { [key in Theme]: string; };

const secondaryClasses = {
    slate: 'bg-slate-200 text-slate-700',
    gray: 'bg-gray-200 text-gray-700',
    zinc: 'bg-zinc-200 text-zinc-700',
    neutral: 'bg-neutral-200 text-neutral-700',
    stone: 'bg-stone-200 text-stone-700',
    orange: 'bg-orange-200 text-orange-700',
    amber: 'bg-amber-200 text-amber-700',
    yellow: 'bg-yellow-200 text-yellow-700',
    lime: 'bg-lime-200 text-lime-700',
    green: 'bg-green-200 text-green-700',
    emerald: 'bg-emerald-200 text-emerald-700',
    teal: 'bg-teal-200 text-teal-700',
    cyan: 'bg-cyan-200 text-cyan-700',
    sky: 'bg-sky-200 text-sky-700',
    blue: 'bg-blue-200 text-blue-700',
    indigo: 'bg-indigo-200 text-indigo-700',
    violet: 'bg-violet-200 text-violet-700',
    purple: 'bg-purple-200 text-purple-700',
    fuchsia: 'bg-fuchsia-200 text-fuchsia-700',
    pink: 'bg-pink-200 text-pink-700',
    rose: 'bg-rose-200 text-rose-700',
    red: 'bg-red-200 text-red-700',
    brand: 'bg-brand-200 text-brand-700',
    default: 'bg-gray-200 text-gray-600'
} as { [key in Theme]: string; };

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

        theme,
        label
    },

    setup(props) {
        const classes = computed(() => {
            let classes;

            if (props.secondary) {
                classes = secondaryClasses[props.theme as Theme];
            } else {
                classes = primaryClasses[props.theme as Theme] + ' text-white';
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
