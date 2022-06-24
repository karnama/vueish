<template>
    <div class="button-group" :class="{ spread, vertical }" role="group">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export const props = {
    /**
     * Display the buttons in a vertical order.
     *
     * @default false
     */
    vertical: {
        type: Boolean,
        default: false
    },

    /**
     * Set the width evenly to screen size.
     *
     * @default false
     */
    spread: {
        type: Boolean,
        default: false
    }
};

export default defineComponent({
    name: 'UIButtonGroup',

    props
});
</script>

<style lang="scss">
.button-group {
    @apply flex items-center;
    & > button {
        @apply rounded-none overflow-hidden;
    }
    & > button:last-child {
        @apply rounded-r;
    }
    & > button:first-child {
        @apply rounded-l;
    }

    & > button:focus {
        @apply z-50;
    }
}
.vertical {
    @apply flex-col items-start w-max;
    & > button {
        @apply flex-1 w-full;
    }
    & > button:last-child {
        @apply rounded-b rounded-tr-none;
    }
    & > button:first-child {
        @apply rounded-t rounded-bl-none;
    }
}
.spread {
    @apply w-full;
    & > button {
        @apply flex-1 w-full;
    }
}
</style>
