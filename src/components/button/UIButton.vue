<template>
    <button ref="button"
            type="button"
            :class="classes"
            :style="style"
            class="vue-ui-button rounded px-4 disabled:cursor-not-allowed disabled:opacity-50 transition relative">
        <UIFadeTransition mode="in-out">
            <span v-if="loading" class="absolute abs-center">
                <slot name="loader">
                    <UISpinnerLoader class="color"
                                     :stroke="2"
                                     :diameter="25" />
                </slot>
            </span>

            <span v-else>
                <slot>
                    {{ label }}
                </slot>
            </span>
        </UIFadeTransition>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import type { StyleType } from '@/types';
import { type } from '@composables/style';
import { label } from '@composables/input';
import UISpinnerLoader from '@components/loader-spinner/UISpinnerLoader.vue';
import UIFadeTransition from '@components/transitions/UIFadeTransition.vue';

const typeClasses = {
    default: 'hover:bg-gray-200 bg-gray-300 disabled:bg-gray-300',
    primary: 'text-white bg-blue-600 hover:bg-blue-400 disabled:bg-blue-600',
    info: 'text-white bg-blue-400 hover:bg-blue-300 disabled:bg-blue-400',
    success: 'text-white bg-green-400 hover:bg-green-300 disabled:bg-green-400',
    warning: 'text-white bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400',
    danger: 'text-white bg-red-400 hover:bg-red-300 disabled:bg-red-400',
    brand: 'text-white bg-brand-400 hover:bg-brand-300 disabled:bg-brand-400'
} as const;

export default defineComponent({
    name: 'UIButton',
    components: { UIFadeTransition, UISpinnerLoader },
    props: {
        loading: {
            type: Boolean,
            default: false
        },

        label,
        type
    },

    setup(props) {
        const classes = computed(() => {
            return typeClasses[props.type as StyleType] + (props.loading ? ' pointer-events-none' : '');
        });
        const button = ref<HTMLButtonElement>();
        const style = computed<Partial<CSSStyleDeclaration>>(() => {
            const styles = button.value?.getBoundingClientRect();

            return props.loading
                ? {
                    width: String(styles?.width) + 'px',
                    height: String(styles?.height) + 'px'
                }
                : {};
        });

        return {
            classes,
            button,
            style
        };
    }
});
</script>

<style scoped>
.vue-ui-button {
    min-width: 110px;
    min-height: 35px;
}
.color {
    @apply text-white;
}
.abs-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
