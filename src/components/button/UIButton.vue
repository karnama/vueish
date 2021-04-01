<template>
    <button type="button"
            :class="classes"
            :disabled="disabled"
            class="ui-button rounded disabled:cursor-not-allowed disabled:opacity-50
                   transition relative font-bold text-sm border-0 m-0">
        <span class="loader absolute abs-center transition-opacity duration-200"
              :class="{ 'opacity-1': loading, 'opacity-0': !loading }">
            <slot name="loader">
                <UISpinnerLoader
                    v-if="loading"
                    inherit-color
                    :class="loaderColor"
                    :stroke="2"
                    :diameter="25" />
            </slot>
        </span>

        <span class="label transition-opacity duration-200"
              :aria-hidden="loading"
              :class="[ loading ? 'opacity-0': 'opacity-1' ]">
            <slot>
                {{ label }}
            </slot>
        </span>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { StyleType } from '@/types';
import { category, large } from '@composables/style';
import { label, disabled } from '@composables/input';
import UISpinnerLoader from '@components/loader-spinner/UISpinnerLoader.vue';

// todo - loading state content may overflow the default width

export default defineComponent({
    name: 'UIButton',

    components: { UISpinnerLoader },

    props: {
        /**
         * Indication whether button is currently loading or not.
         */
        loading: {
            type: Boolean,
            default: false
        },

        /**
         * Use the outline (/secondary) styles.
         */
        outline: {
            type: Boolean,
            default: false
        },

        /**
         * Use the minimal (/ternary) styles.
         */
        minimal: {
            type: Boolean,
            default: false
        },

        disabled,
        large,
        label,
        category
    },

    setup(props) {
        const primaryTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'border border-gray-300 text-gray-900 bg-gray-300 disabled:bg-gray-300' +
                (props.disabled ? '' : ' hover:bg-gray-400'),
            primary: 'border border-blue-600 text-white bg-blue-600' + (props.disabled ? '' : ' hover:bg-blue-700'),
            info: 'border border-blue-400 text-white bg-blue-400' + (props.disabled ? '' : ' hover:bg-blue-500'),
            success: 'border border-green-400 text-white bg-green-400' + (props.disabled ? '' : ' hover:bg-green-500'),
            warning: 'border border-yellow-400 bg-yellow-400' + (props.disabled ? '' : ' hover:bg-yellow-500'),
            danger: 'border border-red-400 text-white bg-red-400' + (props.disabled ? '' : ' hover:bg-red-500'),
            brand: 'border border-brand-400 text-white bg-brand-400' + (props.disabled ? '' : ' hover:bg-brand-500')
        }));
        const outlineTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'text-gray-600 border shadow-sm border-gray-400 disabled:bg-gray-300 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:text-white hover:bg-gray-400'),
            primary: 'text-blue-600 border shadow-sm border-blue-500 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:text-white hover:bg-blue-500 hover:border-blue-500'),
            info: 'text-blue-300 border shadow-sm border-blue-300 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:text-white hover:bg-blue-300 hover:border-blue-300'),
            success: 'text-green-600 border shadow-sm border-green-400 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:text-white hover:bg-green-400 hover:border-green-400'),
            warning: 'text-yellow-500 border shadow-sm border-yellow-300 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:text-white hover:bg-yellow-300 hover:border-yellow-300'),
            danger: 'text-red-600 border shadow-sm border-red-400 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:text-white hover:bg-red-400 hover:border-red-400'),
            brand: 'text-brand-600 border shadow-sm border-brand-400 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:text-white hover:bg-brand-400 hover:border-brand-400')
        }));
        const minimalTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'text-gray-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-gray-200'),
            primary: 'text-blue-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-blue-200'),
            info: 'text-blue-400 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-blue-200'),
            success: 'text-green-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-green-200'),
            warning: 'text-yellow-500 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-yellow-200'),
            danger: 'text-red-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-red-200'),
            brand: 'text-brand-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-brand-200')
        }));

        const classes = computed(() => {
            const category = props.category as StyleType;
            let classes: string;

            if (props.outline) {
                classes = outlineTypeClasses.value[category];
            } else if (props.minimal) {
                classes = minimalTypeClasses.value[category];
            } else {
                classes = primaryTypeClasses.value[category];
            }

            classes += props.large ? ' px-7 py-3.5' : ' px-3.5 py-2';

            if (props.loading) {
                classes += ' pointer-events-none';
            }

            return classes;
        });
        const loaderColor = computed(() => {
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
.abs-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

button {
    transition: filter 100ms ease;
    filter: invert(0%);
}

button:active {
    transition: filter 100ms ease;
    filter: invert(10%);
}
</style>
