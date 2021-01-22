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
export const TYPES = {
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
        type: {
            type: String,
            default: 'default',
            validator: function(value) {
                return Object.keys(TYPES).includes(value);
            }
        }
    },

    computed: {
        classes() {
            if (this.type === 'default') {
                return this.disabled ? 'bg-dark cursor-not-allowed' : 'hover:bg-dark';
            }
            if (!this.disabled) {
                return TYPES[this.type] + ' hover:bg-' + this.type + '-light';
            }
            return 'bg-' + this.type + '-dark text-white cursor-not-allowed';
        }
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
