<template>
    <transition name="progress-spinner" appear>
        <div class="progress-spinner text-brand-400"
             :class="{ 'indeterminate': !determinate }"
             role="progressbar"
             v-bind="$attrs">
            <svg ref="spinnerDraw"
                 class="spinner-draw stroke-current"
                 preserveAspectRatio="xMidYMid"
                 focusable="false"
                 :viewBox="`0 0 ${diameter} ${diameter}`">
                <circle ref="spinnerCircle"
                        class="spinner-circle stroke-current"
                        cx="50%"
                        cy="50%"
                        :r="radius"
                        :stroke-width="stroke + 'px'" />
            </svg>
            <div v-if="$slots.default" class="abs-center">
                <slot />
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted } from 'vue';
import { SetupArg, SetupReturn } from '@/types';

export default defineComponent({
    name: 'SpinnerLoader',

    inheritAttrs: false,

    props: {
        /**
         * The value indicating where the
         * progress is at currently.
         */
        progress: {
            type: Number,
            validator: (value: number) => value >= 0 && value <= 100
        },

        /**
         * Flag indicating that the loader will run
         * until it's set to false.
         */
        determinate: {
            type: Boolean,
            default: false
        },

        /**
         * The diameter of the circle in pixels.
         */
        diameter: {
            type: Number,
            default: 60
        },

        /**
         * The width of the stroke in pixels.
         */
        stroke: {
            type: Number,
            default: 6
        }
    },

    setup(props: SetupArg<{ diameter: number; stroke: number }>): SetupReturn {
        const radius = computed(() => (props.diameter - props.stroke) / 2);
        const circumference = computed(() => Math.PI * 2 * radius.value);
        const strokeDashOffset = computed(() => {
            if (!props.determinate) {
                return String(circumference.value) + 'px';
            }
            if (props.progress) {
                return String(circumference.value * (100 - props.progress) / 100) + 'px';
            }
            return String(circumference.value) + 'px';
        });

        const spinnerDraw = ref<SVGElementTagNameMap['svg']>(null!);
        const spinnerCircle = ref<SVGCircleElement>(null!);

        /**
         * Re-calculate the svg styles.
         */
        const attachSvgStyles = (): void => {
            spinnerDraw.value.style.width = `${props.diameter}px`;
            spinnerDraw.value.style.height = `${props.diameter}px`;
        };

        /**
         * Re-calculate the circle shape styles.
         */
        const attachCircleStyles = (): void => {
            spinnerCircle.value.style.strokeDashoffset = strokeDashOffset.value;
            spinnerCircle.value.style.strokeDasharray = String(circumference.value) + 'px';
            spinnerCircle.value.style.setProperty('--spinner-start-value', String(0.95 * circumference.value));
            spinnerCircle.value.style.setProperty('--spinner-end-value', String(0.2 * circumference.value));
        };

        watch([() => props.diameter, () => props.stroke, () => props.progress], attachCircleStyles);
        watch(() => props.diameter, attachSvgStyles);

        onMounted(() => {
            attachSvgStyles();
            attachCircleStyles();
        });

        return {
            spinnerDraw,
            spinnerCircle,
            radius,
            circumference,
            strokeDashOffset
        };
    }
});
</script>

<style scoped lang="scss">
.progress-spinner {
    position: relative;
    width: max-content;

    &.indeterminate > svg {
        animation: progress-spinner-rotate 2s linear infinite;

        &.spinner-enter,
        &.spinner-leave-to {
            .spinner-draw {
                opacity: 0;
                transform: scale(.1);
            }
        }

        &.spinner-enter-active,
        &.spinner-leave-active {
            transition-duration: .4s;
            animation: none;
        }

        .spinner-circle {
            animation: 4s infinite ease-in-out;
            animation-name: spinner-stroke-rotate;
        }
    }
}

.abs-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.spinner-draw {
    transform: scale(1);
    transform-origin: center;
    transition: 200ms ease-in-out;
    will-change: opacity, transform;
}

.spinner-circle {
    fill: none;
    transform-origin: center;
    transition: stroke-dashoffset 200ms ease-in-out;
}

@keyframes progress-spinner-rotate {
    0% {
        transform: rotate(0)
    }
    100% {
        transform: rotate(360deg)
    }
}

@keyframes spinner-stroke-rotate {
    0% {
        stroke-dashoffset: var(--spinner-start-value);
        transform: rotate(0);
    }
    12.5% {
        stroke-dashoffset: var(--spinner-end-value);
        transform: rotate(0);
    }
    12.51% {
        stroke-dashoffset: var(--spinner-end-value);
        transform: rotateX(180deg) rotate(72.5deg);
    }
    25% {
        stroke-dashoffset: var(--spinner-start-value);
        transform: rotateX(180deg) rotate(72.5deg);
    }
    25.1% {
        stroke-dashoffset: var(--spinner-start-value);
        transform: rotate(270deg);
    }
    37.5% {
        stroke-dashoffset: var(--spinner-end-value);
        transform: rotate(270deg);
    }
    37.51% {
        stroke-dashoffset: var(--spinner-end-value);
        transform: rotateX(180deg) rotate(161.5deg);
    }
    50% {
        stroke-dashoffset: var(--spinner-start-value);
        transform: rotateX(180deg) rotate(161.5deg);
    }
    50.01% {
        stroke-dashoffset: var(--spinner-start-value);
        transform: rotate(180deg);
    }
    62.5% {
        stroke-dashoffset: var(--spinner-end-value);
        transform: rotate(180deg);
    }
    62.51% {
        stroke-dashoffset: var(--spinner-end-value);
        transform: rotateX(180deg) rotate(251.5deg);
    }
    75% {
        stroke-dashoffset: var(--spinner-start-value);
        transform: rotateX(180deg) rotate(251.5deg);
    }
    75.01% {
        stroke-dashoffset: var(--spinner-start-value);
        transform: rotate(90deg);
    }
    87.5% {
        stroke-dashoffset: var(--spinner-end-value);
        transform: rotate(90deg);
    }
    87.51% {
        stroke-dashoffset: var(--spinner-end-value);
        transform: rotateX(180deg) rotate(341.5deg);
    }
    100% {
        stroke-dashoffset: var(--spinner-start-value);
        transform: rotateX(180deg) rotate(341.5deg);
    }
}

.progress-spinner-enter-active {
    transition: all 200ms ease-out;
}

.progress-spinner-leave-active {
    transition: all 200ms ease-in;
}

.progress-spinner-enter,
.appear-active-class,
.progress-spinner-leave-to {
    transform: scale(0.1);
    opacity: 0;
}
</style>
