<template>
    <transition name="progress-spinner" appear>
        <div class="ui-spinner-loader"
             :class="{ 'indeterminate': !determinate, 'text-brand-400': !inheritColor }"
             role="progressbar"
             v-bind="$attrs">
            <svg ref="spinnerDraw"
                 class="spinner-draw stroke-current"
                 preserveAspectRatio="xMidYMid"
                 focusable="false"
                 :viewBox="`0 0 ${diameter} ${diameter}`">
                <circle v-if="determinate"
                        class="spinner-circle"
                        :class="[ inheritColor ? 'background-circle': 'stroke-brand-100']"
                        cx="50%"
                        cy="50%"
                        :r="radius"
                        :stroke-width="stroke + 'px'" />
                <circle ref="spinnerCircle"
                        class="spinner-circle stroke-current"
                        cx="50%"
                        cy="50%"
                        :r="radius"
                        :stroke-width="stroke + 'px'" />
            </svg>
            <div v-if="$slots.default" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <slot />
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted, onUnmounted } from 'vue';
import { inheritColor, determinate, steps, progress } from '@/shared-props';

export default defineComponent({
    name: 'UISpinnerLoader',

    inheritAttrs: false,

    props: {
        /**
         * The diameter of the circle in pixels.
         *
         * @default 60
         */
        diameter: {
            type: [Number, String],
            default: 60
        },

        /**
         * The width of the stroke in pixels.
         *
         * @default 6
         */
        stroke: {
            type: [Number, String],
            default: 6
        },

        inheritColor,
        determinate,
        steps,
        progress
    },

    setup(props) {
        const watchers: ReturnType<typeof watch>[] = [];
        const radius = computed(() => (Number(props.diameter) - Number(props.stroke)) / 2);
        const circumference = computed(() => Math.PI * 2 * radius.value);
        const strokeDashOffset = computed<string>(() => {
            if (!props.determinate) {
                return `${circumference.value}px`;
            }

            if (props.progress) {
                const step = circumference.value / Number(props.steps);

                return `${circumference.value - step * Number(props.progress)}px`;
            }

            return `${circumference.value}px`;
        });

        const spinnerDraw = ref<SVGElementTagNameMap['svg']>();
        const spinnerCircle = ref<SVGCircleElement>();

        /**
         * Re-calculate the svg styles.
         */
        const attachSvgStyles = (): void => {
            spinnerDraw.value!.style.width = `${props.diameter}px`;
            spinnerDraw.value!.style.height = `${props.diameter}px`;
        };

        /**
         * Re-calculate the circle shape styles.
         */
        const attachCircleStyles = (): void => {
            spinnerCircle.value!.style.strokeDashoffset = strokeDashOffset.value;
            spinnerCircle.value!.style.strokeDasharray = `${circumference.value}px`;
            spinnerCircle.value!.style.setProperty('--spinner-start-value', String(0.95 * circumference.value));
            spinnerCircle.value!.style.setProperty('--spinner-end-value', String(0.2 * circumference.value));
        };

        watchers.push(
            watch(
                [
                    () => props.diameter,
                    () => props.stroke,
                    () => props.progress,
                    () => props.steps,
                    () => props.determinate
                ],
                attachCircleStyles
            ),
            watch(() => props.diameter, attachSvgStyles)
        );

        onMounted(() => {
            attachSvgStyles();
            attachCircleStyles();
        });
        onUnmounted(() => {
            watchers.forEach(stop => stop());
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
.ui-spinner-loader {
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

.background-circle {
    stroke-opacity: 0.4;
    stroke: currentColor;
    filter: brightness(160%) saturate(60%) contrast(80%);
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
