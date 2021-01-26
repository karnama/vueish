<template>
    <button type="button"
            :class="classes"
            class="vue-ui-button rounded px-4"
            :disabled="disabled || loading">

        <svg v-if="loading"
             class="spinner-draw stroke-current"
             stroke="blue"
             preserveAspectRatio="xMidYMid"
             focusable="false"
             viewBox="0 0 20 20"
             ref="spinnerDraw">
            <circle class="spinner-circle stroke-current" cx="50%" cy="50%" r="27"
                    stroke-width="6 + 'px'" ref="spinnerCircle"></circle>
        </svg>

        <slot v-else>
            {{ label }}
        </slot>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export const TYPES = {
    default: '',
    primary: 'text-white bg-primary',
    info: 'text-white bg-info',
    success: 'text-white bg-success',
    warning: 'text-white bg-warning',
    danger: 'text-white bg-danger',
    brand: 'text-white bg-brand'
} as { [key: string]: string; };

export default defineComponent({
    name: 'UIButton',

    props: {
        /**
         * String label to use as the button text.
         */
        label: String,

        /**
         * Boolean flag to toggle loading animation on/off.
         */
        loading: Boolean,

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
        type: {
            type: String,
            default: 'default',
            validator: (value: string) => Object.keys(TYPES).includes(value)
        }
    },

    setup(props) {
        const classes = computed(() => {
            if (props.type === 'default') {
                return props.disabled ? 'bg-dark cursor-not-allowed' : 'hover:bg-dark';
            }

            if (!props.disabled) {
                return TYPES[props.type] + ' hover:bg-' + props.type + '-light';
            }

            return 'bg-' + props.type + '-dark text-white cursor-not-allowed';
        });

        return { classes };
    }
});
</script>

<style scoped>
.vue-ui-button {
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
