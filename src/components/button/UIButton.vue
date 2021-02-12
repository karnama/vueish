<template>
    <button type="button"
            :class="classes"
            class="vue-ui-button rounded px-4 disabled:cursor-not-allowed disabled:opacity-50">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ButtonType, types, typeClasses } from './types';

export default defineComponent({
    name: 'UIButton',

    props: {
        /**
         * String label to use as the button text.
         */
        label: String,

        /**
         * The type of button (default, primary, etc).
         */
        type: {
            type: String,
            default: 'default',
            validator: (value: ButtonType) => types.includes(value)
        }
    },

    setup(props) {
        const classes = computed(() => typeClasses[props.type as ButtonType]);

        return { classes };
    }
});
</script>

<style scoped>
.vue-ui-button {
    min-width: 110px;
    min-height: 35px;
}
</style>
