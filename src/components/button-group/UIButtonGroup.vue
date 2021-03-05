<template>
    <div class="button-group" :class="{ vertical, spread }" role="group">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export const props = {
    vertical: {
        type: Boolean,
        default: false
    },

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
}
.vertical {
    @apply flex-col items-start;
    & > button:last-child {
        @apply rounded-b rounded-r-none;
    }
    & > button:first-child {
        @apply rounded-t rounded-l-none;
    }
}
.spread {
    & > button {
        @apply flex-1 w-full;
    }
}
</style>
