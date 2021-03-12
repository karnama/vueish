<template>
    <button type="button"
            :class="classes"
            :disabled="disabled"
            class="ui-button rounded disabled:cursor-not-allowed disabled:opacity-50
                   px-3 py-2 transition relative font-bold text-sm border-0">
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

        <span class="label opacity-1 transition-opacity duration-200"
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
import { label, disabled } from '@composables/input';
import UISpinnerLoader from '@components/loader-spinner/UISpinnerLoader.vue';

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

        disabled,
        large,
        label,
        type
    },

    setup(props) {
        const primaryTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'text-gray-900 bg-gray-300 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-gray-200'),
            primary: 'text-white bg-blue-600' + (props.disabled ? '' : ' hover:bg-blue-400'),
            info: 'text-white bg-blue-400' + (props.disabled ? '' : ' hover:bg-blue-300'),
            success: 'text-white bg-green-400' + (props.disabled ? '' : ' hover:bg-green-300'),
            warning: 'bg-yellow-400' + (props.disabled ? '' : ' hover:bg-yellow-300'),
            danger: 'text-white bg-red-400' + (props.disabled ? '' : ' hover:bg-red-300'),
            brand: 'text-white bg-brand-400' + (props.disabled ? '' : ' hover:bg-brand-300')
        }));
        const secondaryTypeClasses = computed<{ [key in StyleType]: string; }>(() =>({
            default: 'border shadow-sm border-gray-300 disabled:bg-gray-300 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:bg-gray-200'),
            primary: 'border shadow-sm border-blue-400 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:bg-blue-400 hover:border-blue-400'),
            info: 'border shadow-sm border-blue-200 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:bg-blue-200 hover:border-blue-200'),
            success: 'border shadow-sm border-green-300 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:bg-green-300 hover:border-green-300'),
            warning: 'border shadow-sm border-yellow-300 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:bg-yellow-300 hover:border-yellow-300'),
            danger: 'border shadow-sm border-red-300 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:bg-red-300 hover:border-red-300'),
            brand: 'border shadow-sm border-brand-300 disabled:bg-gray-200 disabled:shadow-none'
                + (props.disabled ? '' : ' hover:bg-brand-300 hover:border-brand-300')
        }));
        const ternaryTypeClasses = computed<{ [key in StyleType]: string; }>(() => ({
            default: 'text-gray-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-gray-200'),
            primary: 'text-blue-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-blue-200'),
            info: 'text-blue-400 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-blue-200'),
            success: 'text-green-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-green-200'),
            warning: 'text-yellow-500 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-yellow-200'),
            danger: 'text-red-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-red-200'),
            brand: 'text-brand-600 disabled:bg-gray-300' + (props.disabled ? '' : ' hover:bg-brand-200')
        }));

        const classes = computed(() => {
            const type = props.type as StyleType;
            let classes: string;

            if (props.secondary) {
                classes = secondaryTypeClasses.value[type];
            } else if (props.ternary) {
                classes = ternaryTypeClasses.value[type];
            } else {
                classes = primaryTypeClasses.value[type];
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
