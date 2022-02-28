<template>
    <button type="button"
            :class="classes"
            :disabled="disabled"
            class="ui-button rounded font-bold text-sm m-0 focus:outline-none ring-0 disabled:cursor-not-allowed">
        <UIFadeTransition>
            <span v-if="loading" class="loader">
                <slot name="loader">
                    <UISpinnerLoader v-if="loading"
                                     inherit-color
                                     class="px-4 mx-auto"
                                     :class="loaderColor"
                                     :stroke="2"
                                     :diameter="25" />
                </slot>
            </span>

            <span v-else class="label">
                <slot>
                    {{ label }}
                </slot>
            </span>
        </UIFadeTransition>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { StyleType } from 'types';
import { category, large, label, disabled, loading } from '@/shared-props';
import UISpinnerLoader from 'components/loader-spinner/UISpinnerLoader.vue';
import UIFadeTransition from 'components/transitions/UIFadeTransition.vue';

export default defineComponent({
    name: 'UIButton',

    components: { UIFadeTransition, UISpinnerLoader },

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
            success: 'border-green-400 text-white bg-green-400 ring-green-600'
                + (props.disabled ? '' : ' hover:bg-green-500 hover:border-green-500'),
            warning: 'border-yellow-400 bg-yellow-400 ring-yellow-600'
                + (props.disabled ? '' : ' hover:bg-yellow-500 hover:border-yellow-500'),
            danger: 'border-red-400 text-white bg-red-400 ring-red-700'
                + (props.disabled ? '' : ' hover:bg-red-500 hover:border-red-500'),
            brand: 'border-brand-400 text-white bg-brand-400 ring-brand-700'
                + (props.disabled ? '' : ' hover:bg-brand-500 hover:border-brand-500')
        }));
        const outlineTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'text-gray-600 dark:text-gray-400 shadow-sm border-gray-400 disabled:bg-gray-300' +
                'disabled:shadow-none ring-gray-600'
                + (props.disabled ? '' : ' hover:text-white dark:hover:text-white hover:bg-gray-400'),
            primary: 'text-blue-600 shadow-sm border-blue-500 disabled:bg-gray-200 disabled:shadow-none ring-blue-600'
                + (props.disabled ? '' : ' hover:text-white hover:bg-blue-500 hover:border-blue-500'),
            info: 'text-blue-300 shadow-sm border-blue-300 disabled:bg-gray-200 disabled:shadow-none ring-blue-300'
                + (props.disabled ? '' : ' hover:text-white hover:bg-blue-300 hover:border-blue-300'),
            success: 'text-green-600 shadow-sm border-green-400 disabled:bg-gray-200 disabled:shadow-none' +
                'ring-green-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-green-400 hover:border-green-400'),
            warning: 'text-yellow-500 shadow-sm border-yellow-300 disabled:bg-gray-200 disabled:shadow-none' +
                'ring-yellow-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-yellow-300 hover:border-yellow-300'),
            danger: 'text-red-600 shadow-sm border-red-400 disabled:bg-gray-200 disabled:shadow-none ring-red-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-red-400 hover:border-red-400'),
            brand: 'text-brand-600 shadow-sm border-brand-400 disabled:bg-gray-200 disabled:shadow-none ring-brand-400'
                + (props.disabled ? '' : ' hover:text-white hover:bg-brand-400 hover:border-brand-400')
        }));
        const minimalTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'text-gray-600 dark:text-gray-500 disabled:bg-gray-300 ring-gray-300'
                + (props.disabled ? '' : ' dark:hover:text-gray-600 hover:bg-gray-200'),
            primary: 'text-blue-600 disabled:bg-gray-300 ring-blue-400' + (props.disabled ? '' : ' hover:bg-blue-200'),
            info: 'text-blue-400 disabled:bg-gray-300 ring-blue-300' + (props.disabled ? '' : ' hover:bg-blue-200'),
            success: 'text-green-600 disabled:bg-gray-300 ring-green-300'
                + (props.disabled ? '' : ' hover:bg-green-200'),
            warning: 'text-yellow-500 disabled:bg-gray-300 ring-yellow-300'
                + (props.disabled ? '' : ' hover:bg-yellow-200'),
            danger: 'text-red-600 disabled:bg-gray-300 ring-red-300' + (props.disabled ? '' : ' hover:bg-red-200'),
            brand: 'text-brand-600 disabled:bg-gray-300 ring-brand-300' + (props.disabled ? '' : ' hover:bg-brand-200')
        }));

        const classes = computed(() => {
            const category = props.category as StyleType;
            let classes: string;

            if (props.outline) {
                classes = outlineTypeClasses.value[category] + ' border focus:ring-offset-2';
            } else if (props.minimal) {
                classes = minimalTypeClasses.value[category];
            } else {
                classes = primaryTypeClasses.value[category] + ' border';
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
