<template>
    <button type="button"
            :class="classes"
            class="rounded transition-all px-4 vue-ui-button vue-ui-button-width"
            :disabled="disabled"
            v-bind="$attrs">
        <slot/>
    </button>
</template>

<script lang="ts">
import { computed } from "vue";

const propClass = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'brand'] as const;
export const types = {
    default: '',
    primary: 'text-white bg-primary',
    info: 'text-white bg-info',
    success: 'text-white bg-success',
    warning: 'text-white bg-warning',
    danger: 'text-white bg-danger',
    brand: 'text-white bg-brand'
};

export default {
    name: 'UIButton',

    props: {
        /**
         * Boolean flag to enable/disable the button.
         */
        disabled: {
            type: Boolean,
            default: false
        },

        /**
         * The type of button (default, primary, etc).
         */
        smt: {
            required: true,
            default: 'default',
            validator: (value: typeof propClass[number]) => propClass.includes(value)
        }
    },

    setup(ctx: Record<string, unknown>) {
        // @ts-ignore
        const classes = computed(() => {
            // @ts-ignore
            if (ctx.smt === 'default') {
                // @ts-ignore
                return ctx.disabled ? 'bg-dark cursor-not-allowed' : 'hover:bg-dark';
            }
            // @ts-ignore
            if (!ctx.disabled) {
                // @ts-ignore
                return types[this.type] + ' hover:bg-' + ctx.type + '-light';
            }
            // @ts-ignore
            return 'bg-' + this.type + '-dark text-white cursor-not-allowed';
        })
    }
};
</script>

<style>
.vue-ui-button-width {
    min-width: 110px;
    min-height: 35px;
}

.vue-ui-button:disabled {
    filter: grayscale(30%);
}

.vue-ui-button:active:enabled {
    box-shadow: inset 0 0 100px -3px rgba(0, 0, 0, 0.2);
}
</style>
