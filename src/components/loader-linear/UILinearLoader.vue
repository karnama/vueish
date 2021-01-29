<template>
    <div class="w-full overflow-hidden"
         :style="{ 'height': height + 'px' }">
        <div class="relative h-full">
            <div class="progress-background w-full absolute h-full bg-brand-300" />
            <div class="absolute h-full"
                 role="progressbar"
                 :class="determinate ? 'bg-brand-600' : 'indeterminate'"
                 :style="{width}" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { SetupArg } from '../../types';

export default defineComponent({
    name: 'UILinearLoader',

    props: {
        /**
         * The value indicating where the
         * progress is at currently.
         *
         * @type {number}
         */
        progress: {
            type: Number,
            default: 0
        },

        /**
         * Flag indicating that the loader will run
         * until it's set to false.
         *
         * @type {boolean}
         */
        determinate: {
            type: Boolean,
            default: false
        },

        /**
         * The diameter of the circle in pixels.
         *
         * @type {number}
         */
        steps: {
            type: Number,
            validator: function(value: number) {
                return value > 2;
            }
        },

        /**
         * The height of the component in px.
         *
         * @type {number}
         */
        height: {
            type: Number,
            default: 4,
            validator: function(value: number) {
                return value > 0;
            }
        }
    },

    setup(props: SetupArg) {
        if (props.determinate) {
            if (!props.steps) {
                throw new TypeError(
                    'UILinearLoader - The prop is set to finite loading without giving a number of steps'
                );
            }
            if (props.progress > props.steps) {
                throw new TypeError('UILinearLoader  - The progress cannot be higher that the steps');
            }
        }

        const width = computed(() => {
            if (!props.determinate) {
                return '100%';
            }

            return String(100 / props.steps * props.progress) + '%';
        });

        return {
            width
        };
    }
});
</script>

<style lang="scss" scoped>
.progress-background {
    background-clip: padding-box;
    opacity: 0.6;
}

.indeterminate:before {
    content: '';
    z-index: 1000;
    position: absolute;
    @apply bg-brand-600;
    filter: brightness(110%);
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, width;
    animation: increase 2s infinite;
}

.indeterminate:after {
    content: '';
    z-index: 1000;
    position: absolute;
    @apply bg-brand-600;
    filter: brightness(110%);
    opacity: 1;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, width;
    animation: decrease 2s 0.5s infinite;
}

@keyframes increase {
    from {
        left: -5%;
        width: 5%;
    }
    to {
        left: 130%;
        width: 100%;
    }
}

@keyframes decrease {
    from {
        left: -80%;
        width: 80%;
    }
    to {
        left: 110%;
        width: 10%;
    }
}
</style>
