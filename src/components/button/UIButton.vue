<template>
    <button type="button"
            :class="classes"
            class="ui-button rounded disabled:cursor-not-allowed disabled:opacity-50
                   px-3 py-2 transition relative font-bold text-sm border-0">
        <span class="absolute abs-center transition-opacity duration-200"
              :class="{ 'opacity-1': loading, 'opacity-0': !loading }">
            <slot name="loader">
                <UISpinnerLoader
                    inherit-color
                    :class="loaderColor"
                    :stroke="2"
                    :diameter="25" />
            </slot>
        </span>

        <span class="opacity-1 transition-opacity duration-200"
              :aria-hidden="loading"
              :class="{ 'opacity-0': loading }">
            <slot>
                {{ label }}
            </slot>
        </span>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { StyleType } from '@/types';
import { type, large } from '@composables/style';
import { label } from '@composables/input';
import UISpinnerLoader from '@components/loader-spinner/UISpinnerLoader.vue';

/* eslint-disable max-len */
const primaryTypeClasses = {
    default: 'text-gray-900 hover:bg-gray-200 bg-gray-300 disabled:bg-gray-300',
    primary: 'text-white bg-blue-600 hover:bg-blue-400',
    info: 'text-white bg-blue-400 hover:bg-blue-300',
    success: 'text-white bg-green-400 hover:bg-green-300',
    warning: 'bg-yellow-400 hover:bg-yellow-300',
    danger: 'text-white bg-red-400 hover:bg-red-300',
    brand: 'text-white bg-brand-400 hover:bg-brand-300'
} as const;

const secondaryTypeClasses = {
    default: 'border shadow-sm border-gray-300 hover:bg-gray-200 disabled:bg-gray-300 disabled:shadow-none',
    primary: 'border shadow-sm border-blue-600 hover:bg-blue-400 hover:border-blue-400 disabled:bg-gray-200 disabled:shadow-none',
    info: 'border shadow-sm border-blue-400 hover:bg-blue-300 hover:border-blue-300 disabled:bg-gray-200 disabled:shadow-none',
    success: 'border shadow-sm border-green-400 hover:bg-green-300 hover:border-green-300  disabled:bg-gray-200 disabled:shadow-none',
    warning: 'border shadow-sm border-yellow-400 hover:bg-yellow-300 hover:border-yellow-300 disabled:bg-gray-200 disabled:shadow-none',
    danger: 'border shadow-sm border-red-400 hover:bg-red-300 hover:border-red-300 disabled:bg-gray-200 disabled:shadow-none',
    brand: 'border shadow-sm border-brand-400 hover:bg-brand-300 hover:border-brand-300 disabled:bg-gray-200 disabled:shadow-none'
} as { [key in StyleType]: string; };

const ternaryTypeClasses = {
    default: 'text-gray-600 hover:bg-gray-200 disabled:bg-gray-300',
    primary: 'text-blue-600 hover:bg-blue-200 disabled:bg-gray-300',
    info: 'text-blue-400 hover:bg-blue-200 disabled:bg-gray-300',
    success: 'text-green-600 hover:bg-green-200 disabled:bg-gray-300',
    warning: 'text-yellow-500 hover:bg-yellow-200 disabled:bg-gray-300',
    danger: 'text-red-600 hover:bg-red-200 disabled:bg-gray-300',
    brand: 'text-brand-600 hover:bg-brand-200 disabled:bg-gray-300'
} as { [key in StyleType]: string; };
/* eslint-enable max-len */

// todo - loading state content may overflow the default width
export default defineComponent({
    name: 'UIButton',
    components: { UISpinnerLoader },
    props: {
        loading: {
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

        large,
        label,
        type
    },

    setup(props) {
        const classes = computed(() => {
            const type = props.type as StyleType;
            let classes: string;

            if (props.secondary) {
                classes = secondaryTypeClasses[type];
            } else if (props.ternary) {
                classes = ternaryTypeClasses[type];
            } else {
                classes = primaryTypeClasses[type];
            }

            if (props.large) {
                classes += ' px-7 py-3';
            }

            if (props.loading) {
                classes += ' pointer-events-none';
            }

            return classes;
        });
        const loaderColor = computed(() => {
            if (!props.secondary && !props.ternary) {
                return '';
            }

            let color: string;

            switch (props.type) {
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
</style>
