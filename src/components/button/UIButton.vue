<template>
    <button type="button"
            :class="classes"
            :disabled="disabled"
            class="ui-button rounded font-bold text-sm m-0 focus:outline-none ring-0
                   disabled:cursor-not-allowed disabled:shadow-none">
        <span v-if="loading" class="loader">
            <slot name="loader">
                <UISpinnerLoader inherit-color
                                 class="px-4 mx-auto"
                                 :class="loaderColor"
                                 :stroke="2"
                                 :diameter="25" />
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
import { computed, defineComponent } from 'vue';
import type { StyleType } from 'types';
import { category, large, label, disabled, loading } from '@/shared-props';
import UISpinnerLoader from 'components/loader-spinner/UISpinnerLoader.vue';

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

        disabled,
        large,
        label,
        category,
        loading
    },

    setup(props) {
        const primaryTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'border-gray-300 text-gray-900 bg-gray-300 disabled:bg-gray-300 ring-gray-600'
                + (props.disabled ? '' : ' hover:bg-gray-400 hover:border-gray-400'),
            primary: 'border-blue-600 text-white bg-blue-600 ring-blue-300'
                + (props.disabled ? '' : ' hover:bg-blue-700 hover:border-blue-700'),
            info: 'border-blue-400 text-white bg-blue-400 ring-blue-600'
                + (props.disabled ? '' : ' hover:bg-blue-500 hover:border-blue-500'),
            success: 'border-green-500 text-white bg-green-500 ring-green-400'
                + (props.disabled ? '' : ' hover:bg-green-600 hover:border-green-600'),
            warning: 'border-yellow-400 bg-yellow-400 ring-yellow-600'
                + (props.disabled ? '' : ' hover:bg-yellow-500 hover:border-yellow-500'),
            danger: 'border-red-600 text-white bg-red-600 ring-red-500'
                + (props.disabled ? '' : ' hover:bg-red-700 hover:border-red-700'),
            brand: 'border-brand-600 text-white bg-brand-600 ring-brand-500'
                + (props.disabled ? '' : ' hover:bg-brand-700 hover:border-brand-700')
        }));
        const outlineTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'text-gray-600 dark:text-gray-400 border-gray-400 disabled:bg-gray-300 ring-gray-600'
                + (props.disabled ? '' : ' hover:text-white dark:hover:text-white hover:bg-gray-400'),
            primary: 'text-blue-600 border-blue-500 disabled:bg-gray-200 ring-blue-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-blue-500 hover:border-blue-500'),
            info: 'text-blue-400 border-blue-300 disabled:bg-gray-200 ring-blue-300'
                + (props.disabled ? '' : ' hover:text-white hover:bg-blue-300 hover:border-blue-300'),
            success: 'text-green-600 border-green-500 disabled:bg-gray-200 ring-green-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-green-600 hover:border-green-600'),
            warning: 'text-yellow-500 border-yellow-300 disabled:bg-gray-200 ring-yellow-400'
                + (props.disabled ? '' : ' hover:text-black hover:bg-yellow-400 hover:border-yellow-300'),
            danger: 'text-red-600 border-red-600 disabled:bg-gray-200 ring-red-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-red-600 hover:border-red-600'),
            brand: 'text-brand-600 border-brand-600 disabled:bg-gray-200 ring-brand-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-brand-600 hover:border-brand-600')
        }));
        const minimalTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'text-gray-600 dark:text-gray-500 ring-gray-300'
                + (props.disabled ? '' : ' dark:hover:text-gray-600 hover:bg-gray-200'),
            primary: 'text-blue-600 ring-blue-400' + (props.disabled ? '' : ' hover:bg-blue-200'),
            info: 'text-blue-400 ring-blue-300' + (props.disabled ? '' : ' hover:bg-blue-200'),
            success: 'text-green-600 ring-green-300' + (props.disabled ? '' : ' hover:bg-green-200'),
            warning: 'text-yellow-500 ring-yellow-300'
                + (props.disabled ? '' : ' hover:bg-yellow-200 hover:text-yellow-600'),
            danger: 'text-red-600 ring-red-300' + (props.disabled ? '' : ' hover:bg-red-200'),
            brand: 'text-brand-600 ring-brand-300' + (props.disabled ? '' : ' hover:bg-brand-200')
        }));

        const classes = computed(() => {
            const category = props.category as StyleType;
            let classes: string;

            if (props.outline) {
                classes = outlineTypeClasses.value[category] + ' shadow-sm border focus:ring-offset-2';
            } else if (props.minimal) {
                classes = minimalTypeClasses.value[category];
            } else {
                classes = primaryTypeClasses.value[category] + ' shadow-sm border';
            }

            classes += props.large ? ' px-7 py-3.5' : ' px-3.5 py-2';

            if (props.loading) {
                classes += ' pointer-events-none';
            }

            if (!props.disabled) {
                classes += ' focus:ring-2';
            }

            return classes;
        });
        const loaderColor = computed<string>(() => {
            if (!props.outline && !props.minimal) {
                return '';
            }

            let color: string;

            switch (props.category) {
                case 'primary':
                    color = 'text-blue-600';
                    break;
                case 'info':
                    color = 'text-blue-400';
                    break;
                case 'success':
                    color = 'text-green-400';
                    break;
                case 'warning':
                    color = 'text-yellow-400';
                    break;
                case 'danger':
                    color = 'text-red-400';
                    break;
                case 'brand':
                    color = 'text-brand-400';
                    break;
                default:
                    color = 'text-gray-400';
            }

            return color;
        });

        return {
            classes,
            loaderColor
        };
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
