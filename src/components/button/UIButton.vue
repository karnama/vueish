<template>
    <button type="button"
            :class="classes"
            :disabled="disabled"
            :style="styles"
            class="ui-button rounded font-bold text-sm m-0 focus:outline-none ring-0
                   disabled:cursor-not-allowed disabled:shadow-none">
        <span v-if="loading" class="ui-button-loader">
            <slot name="loader">
                <UISpinnerLoader inherit-color
                                 class="mx-auto"
                                 :stroke="large ? 3 : 2"
                                 :diameter="small ? 20 : 25" />
            </slot>
        </span>
        <template v-else>
            <slot>
                {{ label }}
            </slot>
        </template>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, watch } from 'vue';
import type { Theme } from 'types';
import { theme, large, small, label, disabled, loading } from '@/shared-props';
import UISpinnerLoader from 'components/loader-spinner/UISpinnerLoader.vue';
import { getPxValue } from 'composables/style';

export default defineComponent({
    name: 'UIButton',

    components: { UISpinnerLoader },

    props: {
        /**
         * Use the outline (/secondary) styles.
         *
         * @default false
         */
        outline: {
            type: Boolean,
            default: false
        },

        /**
         * Use the minimal (/ternary) styles.
         *
         * @default false
         */
        minimal: {
            type: Boolean,
            default: false
        },

        /**
         * Use the tinted (/quaternary) styles
         *
         * @default false
         */
        tinted: {
            type: Boolean,
            default: false
        },

        disabled,
        large,
        small,
        label,
        theme,
        loading
    },

    setup(props) {
        const instance = getCurrentInstance()!;
        const primaryTypeClasses = computed<{ [key in Theme]: string; }>(() => ({
            slate: 'border-slate-600 bg-slate-600 text-white ring-slate-500'
                + (props.disabled ? ' bg-slate-400 border-slate-400' : ' hover:bg-slate-700 hover:border-slate-700'),
            zinc: 'border-zinc-600 bg-zinc-600 text-white ring-zinc-500'
                + (props.disabled ? ' bg-zinc-400 border-zinc-400' : ' hover:bg-zinc-700 hover:border-zinc-700'),
            neutral: 'border-neutral-600 bg-neutral-600 text-white ring-neutral-500'
                + (props.disabled
                    ? ' bg-neutral-400 border-neutral-400'
                    : ' hover:bg-neutral-700 hover:border-neutral-700'),
            stone: 'border-stone-600 bg-stone-600 text-white ring-stone-500'
                + (props.disabled ? ' bg-stone-400 border-stone-400' : ' hover:bg-stone-700 hover:border-stone-700'),
            gray: 'border-gray-600 bg-gray-600 text-white ring-gray-500'
                + (props.disabled ? ' bg-gray-400 border-gray-400' : ' hover:bg-gray-750 hover:border-gray-750'),
            orange: 'border-orange-600 text-white bg-orange-600 ring-orange-400'
                + (props.disabled ? '' : ' hover:bg-orange-700 hover:border-orange-700'),
            amber: 'border-amber-600 text-white bg-amber-600 ring-amber-500'
                + (props.disabled ? '' : ' hover:bg-amber-700 hover:border-amber-700'),
            yellow: 'border-yellow-400 bg-yellow-400 ring-yellow-600 text-gray-900'
                + (props.disabled ? '' : ' hover:bg-yellow-500 hover:border-yellow-500'),
            lime: 'border-lime-500 text-white bg-lime-500 ring-lime-400'
                + (props.disabled ? '' : ' hover:bg-lime-600 hover:border-lime-600'),
            green: 'border-green-500 text-white bg-green-500 ring-green-400'
                + (props.disabled ? '' : ' hover:bg-green-600 hover:border-green-600'),
            emerald: 'border-emerald-500 text-white bg-emerald-500 ring-emerald-400'
                + (props.disabled ? '' : ' hover:bg-emerald-600 hover:border-emerald-600'),
            teal: 'border-teal-400 text-white bg-teal-400 ring-teal-200'
                + (props.disabled ? '' : ' hover:bg-teal-500 hover:border-teal-500'),
            cyan: 'border-cyan-600 text-white bg-cyan-600 ring-cyan-300'
                + (props.disabled ? '' : ' hover:bg-cyan-700 hover:border-cyan-700'),
            sky: 'border-sky-600 text-white bg-sky-600 ring-sky-300'
                + (props.disabled ? '' : ' hover:bg-sky-700 hover:border-sky-700'),
            blue: 'border-blue-600 text-white bg-blue-600 ring-blue-300'
                + (props.disabled ? '' : ' hover:bg-blue-700 hover:border-blue-700'),
            indigo: 'border-indigo-600 text-white bg-indigo-600 ring-indigo-300'
                + (props.disabled ? '' : ' hover:bg-indigo-700 hover:border-indigo-700'),
            violet: 'border-violet-600 text-white bg-violet-600 ring-violet-400'
                + (props.disabled ? '' : ' hover:bg-violet-700 hover:border-violet-700'),
            purple: 'border-purple-600 text-white bg-purple-600 ring-purple-500'
                + (props.disabled ? '' : ' hover:bg-purple-700 hover:border-purple-700'),
            fuchsia: 'border-fuchsia-600 text-white bg-fuchsia-600 ring-fuchsia-500'
                + (props.disabled ? '' : ' hover:bg-fuchsia-700 hover:border-fuchsia-700'),
            pink: 'border-pink-600 text-white bg-pink-600 ring-pink-500'
                + (props.disabled ? '' : ' hover:bg-pink-700 hover:border-pink-700'),
            rose: 'border-rose-600 text-white bg-rose-600 ring-rose-500'
                + (props.disabled ? '' : ' hover:bg-rose-700 hover:border-rose-700'),
            red: 'border-red-600 text-white bg-red-600 ring-red-500'
                + (props.disabled ? '' : ' hover:bg-red-700 hover:border-red-700'),
            brand: 'border-brand-600 text-white bg-brand-600 ring-brand-500'
                + (props.disabled ? '' : ' hover:bg-brand-700 hover:border-brand-700'),
            default: 'border-gray-300 text-gray-900 bg-white disabled:bg-gray-300 ring-gray-600' +
                ' dark:bg-gray-750 dark:shadow-gray-600 dark:text-white dark:border-gray-600'
                + (props.disabled ? '' : ' hover:bg-gray-300 hover:border-gray-300 ' +
                    'dark:hover:bg-gray-800 dark:hover:border-gray-800')
        }));
        const outlineTypeClasses = computed<{ [key in Theme]: string; }>(() => ({
            slate: 'text-slate-600 dark:text-slate-400 border-slate-400 disabled:bg-slate-300 ring-slate-600'
                + (props.disabled ? '' : ' hover:text-white dark:hover:text-white hover:bg-slate-400'),
            zinc: 'text-zinc-600 dark:text-zinc-400 border-zinc-400 disabled:bg-zinc-300 ring-zinc-600'
                + (props.disabled ? '' : ' hover:text-white dark:hover:text-white hover:bg-zinc-400'),
            neutral:'text-neutral-600 dark:text-neutral-400 border-neutral-400 disabled:bg-neutral-300 ring-neutral-600'
                + (props.disabled ? '' : ' hover:text-white dark:hover:text-white hover:bg-neutral-400'),
            stone: 'text-stone-600 dark:text-stone-400 border-stone-400 disabled:bg-stone-300 ring-stone-600'
                + (props.disabled ? '' : ' hover:text-white dark:hover:text-white hover:bg-gray-400'),
            gray: 'text-gray-600 dark:text-gray-400 border-gray-400 disabled:bg-gray-300 ring-gray-600'
                + (props.disabled ? '' : ' hover:text-white dark:hover:text-white hover:bg-gray-400'),
            orange: 'text-orange-600 border-orange-500 disabled:bg-gray-200 ring-orange-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-orange-500 hover:border-orange-500'),
            amber: 'text-amber-600 border-amber-500 disabled:bg-gray-200 ring-amber-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-amber-500 hover:border-amber-500'),
            yellow: 'text-yellow-500 border-yellow-300 disabled:bg-gray-200 ring-yellow-400'
                + (props.disabled ? '' : ' hover:text-black hover:bg-yellow-400 hover:border-yellow-300'),
            lime: 'text-lime-600 border-lime-500 disabled:bg-gray-200 ring-lime-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-lime-500 hover:border-lime-500'),
            green: 'text-green-600 border-green-500 disabled:bg-gray-200 ring-green-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-green-600 hover:border-green-600'),
            emerald: 'text-emerald-600 border-emerald-500 disabled:bg-gray-200 ring-emerald-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-emerald-500 hover:border-emerald-500'),
            teal: 'text-teal-600 border-teal-500 disabled:bg-gray-200 ring-teal-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-teal-500 hover:border-teal-500'),
            cyan: 'text-cyan-600 border-cyan-500 disabled:bg-gray-200 ring-cyan-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-cyan-500 hover:border-cyan-500'),
            sky: 'text-sky-600 border-sky-500 disabled:bg-gray-200 ring-sky-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-sky-500 hover:border-sky-500'),
            blue: 'text-blue-600 border-blue-500 disabled:bg-gray-200 ring-blue-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-blue-500 hover:border-blue-500'),
            indigo: 'text-indigo-600 border-indigo-500 disabled:bg-gray-200 ring-indigo-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-indigo-500 hover:border-indigo-500'),
            violet: 'text-violet-600 border-violet-500 disabled:bg-gray-200 ring-violet-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-violet-500 hover:border-violet-500'),
            purple: 'text-purple-600 border-purple-500 disabled:bg-gray-200 ring-purple-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-purple-500 hover:border-purple-500'),
            fuchsia: 'text-fuchsia-600 border-fuchsia-600 disabled:bg-gray-200 ring-fuchsia-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-fuchsia-600 hover:border-fuchsia-600'),
            pink: 'text-pink-600 border-pink-600 disabled:bg-gray-200 ring-pink-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-pink-600 hover:border-pink-600'),
            rose: 'text-rose-600 border-rose-600 disabled:bg-gray-200 ring-rose-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-rose-600 hover:border-rose-600'),
            red: 'text-red-600 border-red-600 disabled:bg-gray-200 ring-red-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-red-600 hover:border-red-600'),
            brand: 'text-brand-600 border-brand-600 disabled:bg-gray-200 ring-brand-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-brand-600 hover:border-brand-600'),
            default: 'text-gray-600 dark:text-gray-400 border-gray-400 disabled:bg-gray-300 ring-gray-600'
                + (props.disabled
                    ? ''
                    : ' dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:hover:border-gray-800 hover:bg-white')
        }));
        const minimalTypeClasses = computed<{ [key in Theme]: string; }>(() => ({
            slate: 'text-slate-600 dark:text-slate-500 ring-slate-300 border-transparent'
                + (props.disabled ? '' : ' dark:hover:text-slate-600 hover:bg-slate-200 hover:border-slate-200'),
            zinc: 'text-zinc-600 dark:text-zinc-500 ring-zinc-300 border-transparent'
                + (props.disabled ? '' : ' dark:hover:text-zinc-600 hover:bg-zinc-200 hover:border-zinc-200'),
            neutral: 'text-neutral-600 dark:text-neutral-500 ring-neutral-300 border-transparent'
                + (props.disabled ? '' : ' dark:hover:text-neutral-600 hover:bg-neutral-200 hover:border-neutral-200'),
            stone: 'text-stone-600 dark:text-stone-500 ring-stone-300 border-transparent'
                + (props.disabled ? '' : ' dark:hover:text-stone-600 hover:bg-stone-200 hover:border-stone-200'),
            gray: 'text-gray-600 dark:text-gray-500 ring-gray-300 border-transparent'
                + (props.disabled ? '' : ' dark:hover:text-gray-600 hover:bg-gray-200  hover:border-gray-200'),
            orange: 'text-orange-600 ring-orange-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-orange-200 hover:border-orange-200'),
            amber: 'text-amber-600 ring-amber-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-amber-200  hover:border-amber-200'),
            yellow: 'text-yellow-500 ring-yellow-300 border-transparent'
                + (props.disabled ? '' : ' hover:bg-yellow-200 hover:text-yellow-600  hover:border-yellow-200'),
            lime: 'text-lime-600 ring-lime-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-lime-200 hover:border-lime-200'),
            green: 'text-green-600 ring-green-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-green-200 hover:border-green-200' ),
            emerald: 'text-emerald-600 ring-emerald-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-emerald-200 hover:border-emerald-200' ),
            teal: 'text-teal-600 ring-teal-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-teal-200 hover:border-teal-200' ),
            cyan: 'text-cyan-600 ring-cyan-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-cyan-200 hover:border-cyan-200 '),
            sky: 'text-sky-600 ring-sky-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-sky-200 hover:border-sky-200 '),
            blue: 'text-blue-600 ring-blue-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-blue-200  hover:border-blue-200'),
            indigo: 'text-indigo-600 ring-indigo-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-indigo-200  hover:border-indigo-200'),
            violet: 'text-violet-600 ring-violet-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-violet-200  hover:border-violet-200'),
            purple: 'text-purple-600 ring-purple-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-purple-200  hover:border-purple-200'),
            fuchsia: 'text-fuchsia-600 ring-fuchsia-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-fuchsia-200  hover:border-fuchsia-200'),
            pink: 'text-pink-600 ring-pink-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-pink-200  hover:border-pink-200'),
            rose: 'text-rose-600 ring-rose-400 border-transparent'
                + (props.disabled ? '' : ' hover:bg-rose-200  hover:border-rose-200'),
            red: 'text-red-600 ring-red-300 border-transparent'
                + (props.disabled ? '' : ' hover:bg-red-200  hover:border-red-200'),
            default: 'text-gray-600 dark:text-gray-400 ring-gray-300 border-transparent'
                + (props.disabled ? '' : ' dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 ' +
                    'hover:border-gray-200 dark:hover:border-gray-800'),
            brand: 'text-brand-600 ring-brand-300 border-transparent'
                + (props.disabled ? '' : ' hover:bg-brand-200  hover:border-brand-200')
        }));
        const tintedTypeClasses = computed<{ [key in Theme]: string; }>(() => ({
            slate: 'text-slate-800 ring-slate-400 bg-slate-300 border-slate-300'
                + (props.disabled ? '' : ' hover:bg-slate-200 hover:border-slate-200'),
            gray: 'text-gray-800 ring-gray-400 bg-gray-300 border-gray-300'
                + (props.disabled ? '' : ' hover:bg-gray-200 hover:border-gray-200'),
            zinc: 'text-zinc-800 ring-zinc-400 bg-zinc-300 border-zinc-300'
                + (props.disabled ? '' : ' hover:bg-zinc-200 hover:border-zinc-200'),
            neutral: 'text-neutral-800 ring-neutral-400 bg-neutral-300 border-neutral-300'
                + (props.disabled ? '' : ' hover:bg-neutral-200 hover:border-neutral-200'),
            stone: 'text-stone-800 ring-stone-400 bg-stone-300 border-stone-200'
                + (props.disabled ? '' : ' hover:bg-stone-200 hover:border-stone-200'),
            orange: 'text-orange-700 ring-orange-400 bg-orange-200 border-orange-200'
                + (props.disabled ? '' : ' hover:bg-orange-100 hover:border-orange-100'),
            amber: 'text-amber-700 ring-amber-400 bg-amber-200 border-amber-200'
                + (props.disabled ? '' : ' hover:bg-amber-100 hover:border-amber-100'),
            yellow: 'text-yellow-700 ring-yellow-400 bg-yellow-200 border-yellow-200'
                + (props.disabled ? '' : ' hover:bg-yellow-100 hover:border-yellow-100'),
            lime: 'text-lime-700 ring-lime-400 bg-lime-200 border-lime-200'
                + (props.disabled ? '' : ' hover:bg-lime-100 hover:border-lime-100'),
            green: 'text-green-700 ring-green-400 bg-green-200 border-green-200'
                + (props.disabled ? '' : ' hover:bg-green-100 hover:border-green-100'),
            emerald: 'text-emerald-700 ring-emerald-400 bg-emerald-200 border-emerald-200'
                + (props.disabled ? '' : ' hover:bg-emerald-100 hover:border-emerald-100'),
            teal: 'text-teal-700 ring-teal-400 bg-teal-200 border-teal-200'
                + (props.disabled ? '' : ' hover:bg-teal-100 hover:border-teal-100'),
            cyan: 'text-cyan-700 ring-cyan-400 bg-cyan-200 border-cyan-200'
                + (props.disabled ? '' : ' hover:bg-cyan-100 hover:border-cyan-100'),
            sky: 'text-sky-700 ring-sky-400 bg-sky-200 border-sky-200'
                + (props.disabled ? '' : ' hover:bg-sky-100 hover:border-sky-100'),
            blue: 'text-blue-600 ring-blue-400 bg-blue-200 border-blue-200'
                + (props.disabled ? '' : ' hover:bg-blue-100 hover:border-blue-100'),
            indigo: 'text-indigo-600 ring-indigo-400 bg-indigo-200 border-indigo-200'
                + (props.disabled ? '' : ' hover:bg-indigo-100 hover:border-indigo-100'),
            violet: 'text-violet-600 ring-violet-400 bg-violet-200 border-violet-200'
                + (props.disabled ? '' : ' hover:bg-violet-100 hover:border-violet-100'),
            purple: 'text-purple-600 ring-purple-400 bg-purple-200 border-purple-200'
                + (props.disabled ? '' : ' hover:bg-purple-100 hover:border-purple-100'),
            fuchsia: 'text-fuchsia-600 ring-fuchsia-400 bg-fuchsia-200 border-fuchsia-200'
                + (props.disabled ? '' : ' hover:bg-fuchsia-100 hover:border-fuchsia-100'),
            pink: 'text-pink-600 ring-pink-400 bg-pink-200 border-pink-200'
                + (props.disabled ? '' : ' hover:bg-pink-100 hover:border-pink-100'),
            rose: 'text-rose-600 ring-rose-400 bg-rose-200 border-rose-200'
                + (props.disabled ? '' : ' hover:bg-rose-100 hover:border-rose-100'),
            red: 'text-red-600 ring-red-400 bg-red-200 border-red-200'
                + (props.disabled ? '' : ' hover:bg-red-100 hover:border-red-100'),
            brand: 'text-brand-600 ring-brand-400 bg-brand-200 border-brand-200'
                + (props.disabled ? '' : ' hover:bg-brand-100 hover:border-brand-100'),
            default: 'text-gray-600 ring-gray-400 bg-gray-200 border-gray-200'
                + (props.disabled ? '' : ' hover:bg-gray-100 hover:border-gray-100')
        }));

        const classes = computed(() => {
            const theme = props.theme as Theme;
            let classes = 'border';

            if (props.outline) {
                classes += ' ' + outlineTypeClasses.value[theme] + ' shadow-sm focus:ring-offset-2';
            } else if (props.minimal) {
                classes += ' ' + minimalTypeClasses.value[theme];
            } else if (props.tinted) {
                classes += ' ' + tintedTypeClasses.value[theme];
            } else {
                classes += ' ' + primaryTypeClasses.value[theme] + ' shadow-sm';
            }

            classes += props.large
                ? ' px-7 py-3.5 text-base'
                : props.small ? ' px-2 py-1' : ' px-3.5 py-2';

            if (props.loading) {
                classes += ' pointer-events-none';
            }

            if (!props.disabled) {
                classes += ' focus:ring-2';
            }

            return classes;
        });
        const styles: Partial<CSSStyleDeclaration> = {};

        watch(() => props.loading, newVal => {
            const computedStyle = getComputedStyle(instance.proxy!.$el as HTMLButtonElement);

            if (computedStyle.width === 'auto' || computedStyle.width.endsWith('%')) {
                return;
            }

            // while loading sizing props might change but on
            // next loading it will set to the correct width
            if (newVal && !instance.slots.loader) {
                const paddingInline = computedStyle.paddingInline === 'auto' ||
                computedStyle.paddingInline.endsWith('%')
                    ? 0
                    : getPxValue(computedStyle.paddingInline);

                const minWidthRequirement = (props.small ? 20 : 25) + paddingInline * 2;

                if (getPxValue(computedStyle.width) < minWidthRequirement) return;

                styles.width = computedStyle.width;
            } else {
                if (!styles.width) return;

                styles.width = 'auto';
            }
        });

        return { classes, styles };
    }
});
</script>

<style scoped>
button {
    transition: all 150ms ease;
    filter: invert(0%);
}

button:disabled {
    opacity: 0.5;
}

button:active:not(:disabled) {
    filter: invert(10%);
}
</style>
