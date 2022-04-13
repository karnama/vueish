<template>
    <div class="h-10 w-full rounded bg-gray-250 dark:bg-gray-750 text-white dark:text-gray-600"
         :style="{'--duration': `${duration}ms`}"
         :class="[pulse ? 'animate-pulse' : 'animate-shimmer']" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UISkeleton',

    props: {
        /**
         * Use pulse animation instead of default shimmer.
         */
        pulse: {
            type: Boolean,
            default: false
        },

        /**
         * The duration of the animation.
         */
        duration: {
            type: [Number, String],
            default: 1300,
            validator: (num: number) => Number(num) > 0
        }
    }
});
</script>

<style lang="scss" scoped>
.animate-shimmer {
    position: relative;
    overflow: hidden;

    &::after {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
                90deg,
                theme('colors.gray.250') 0,
                theme('colors.gray.200') 20%,
                theme('colors.gray.200') 60%,
                theme('colors.gray.250')
        );
        animation-duration: var(--duration);
        animation-name: shimmer;
        animation-iteration-count: infinite;
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
}
.dark .animate-shimmer::after {
    background-image: linear-gradient(
            90deg,
            theme('colors.gray.750') 0,
            theme('colors.gray.700') 40%,
            theme('colors.gray.700') 60%,
            theme('colors.gray.750')
    );
}
.animate-pulse {
    animation-name: pulse;
    animation-duration: var(--duration);
    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    animation-iteration-count: infinite;

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: .6;
        }
    }
}
</style>
