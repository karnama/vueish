<template>
    <div :class="$attrs.class" :style="$attrs.style">
        <UIExpandTransition>
            <label v-if="label || $slots.label"
                   :for="$attrs.id ?? name"
                   class="font-medium text-color inline-flex"
                   :class="{ 'text-color-error': error || $slots.error }">
                <slot name="label" :value="model">
                    {{ label }}
                </slot>
            </label>
        </UIExpandTransition>

        <teleport to="body">
            <span ref="floatingLabel"
                  class="range-value opacity-0 transition-opacity px-2 py-1
                         bg-brand-400 rounded text-center text-white absolute"
                  :class="{ 'opacity-100': showLabel }"
                  :style="position">
                {{ model }}
            </span>
        </teleport>

        <input :id="$attrs.id ?? name"
               ref="range"
               v-model="model"
               type="range"
               class="range-slider-range bg-darker outline-none text-white transition-all border-0 w-full"
               :style="bgColor"
               :step="step"
               v-bind="omit($attrs, ['class', 'style'])"
               :name="name"
               :disabled="disabled"
               :min="min"
               :max="max"
               @touchstart="showLabel = true"
               @mouseover="showLabel = true"
               @touchend="showLabel = false"
               @mouseout="showLabel = false">

        <UIExpandTransition>
            <slot v-if="error || $slots.error" name="error">
                <p class="text-color-error text-sm mt-2">
                    {{ error }}
                </p>
            </slot>
        </UIExpandTransition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useVModel } from 'composables/input';
import { disabled, name, label, error } from 'composables/input';
import { omit } from 'lodash-es';

let timeoutId: ReturnType<typeof setTimeout>;

// todo - add error styles
// todo - add disappearing label
export default defineComponent({
    name: 'UIRangeSlider',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [Number, String],
            required: true
        },

        /**
         * Minimum value.
         */
        min: {
            type: [Number, String],
            default: 0
        },

        /**
         * Maximum value.
         */
        max: {
            type: [Number, String],
            default: 100
        },

        /**
         * The increment value of the range.
         */
        step: {
            type: [Number, String],
            default: 1
        },

        /**
         * Display the floating label while moving the marker.
         */
        withMarker: {
            type: Boolean,
            default: false
        },

        label,
        disabled,
        name,
        error
    },

    emits: ['update:modelValue'],

    setup(props) {
        const showLabel = ref(false);
        const range = ref<HTMLInputElement>();
        const floatingLabel = ref<HTMLSpanElement>();
        const model = useVModel<number | string>(props);
        /**
         * Progress represented as percentage from 0 to 100 regardless of min and max values
         */
        const progress = computed(() => {
            let min = Number(props.min);
            let max = Number(props.max);
            if (min < 0) {
                max = max + Math.abs(0 - min);
                min = 0;
            }

            const modelValue = Number(model.value);
            const range = max - min;
            const shrinkValue = range / 100;
            const percentage = range / shrinkValue / 100 * modelValue;

            return percentage;
        });

        const bgColor = computed<Partial<CSSStyleDeclaration>>(() => {
            return {
                backgroundImage:
                    `-webkit-gradient(linear, left top, right top,
                    color-stop(${progress.value / 100},
                        ${props.disabled ? 'rgba(0,0,0,0)' : 'rgba(var(--color-brand-400), 1)'}),
                    color-stop(${progress.value / 100}, rgba(0,0,0,0)))`
            };
        });
        const position = ref<Partial<CSSStyleDeclaration>>({});

        watch(
            () => progress.value,
            (val: number) => {
                const rangeRect = range.value?.getBoundingClientRect();
                const labelRect = floatingLabel.value?.getBoundingClientRect();
                const rangeHandleSize = 25;

                if (!rangeRect || !labelRect) return;

                position.value.top = `calc(${rangeRect.y}px - ${labelRect.height}px - ${rangeHandleSize / 2}px - 5px)`;
                const left = rangeRect.left + rangeRect.width / 100 * val - rangeHandleSize / 2 - 50 * val;
                position.value.left = `${left}px`;
                // position.value.left = `calc(${rangeRect.left}px + ${rangeRect.width / 100 * val}px - `
                //     + `${rangeHandleSize / 100 * val}px)`;
            }
        );


        return {
            model,
            showLabel,
            bgColor,
            position,
            range,
            floatingLabel,
            omit
        };
    }
});
</script>

<style lang="scss" scoped>
$shadow: 0px 0px 2px #00000061;
$range-handle-size: 25px;

.range-slider-range {
    transform: rotate(0deg);
    -webkit-appearance: none;
    height: 2px;

    // Range Handle
    &::-webkit-slider-thumb {
        appearance: none;
        width: $range-handle-size;
        height: $range-handle-size;
        border-radius: 50%;
        border: 0;
        box-shadow: $shadow;
        background: currentColor;
        cursor: pointer;

        &:hover {
            background: currentColor;
        }
    }

    &::-moz-range-thumb {
        width: $range-handle-size;
        height: $range-handle-size;
        border: 0;
        box-shadow: $shadow;
        border-radius: 50%;
        background: currentColor;
        cursor: pointer;
        transition: background .15s ease-in-out;

        &:hover {
            background: currentColor;
        }
    }

    &:active {
        &::-moz-range-thumb, ::-webkit-slider-thumb {
            cursor: grabbing;
        }
    }

    &:disabled {
        &::-moz-range-thumb, ::-webkit-slider-thumb {
            @apply bg-gray-400 cursor-not-allowed;
            box-shadow: none;
        }
    }
}

// Firefox Overrides
::-moz-range-track {
    border: 0;
}

input::-moz-focus-inner,
input::-moz-focus-outer {
    border: 0;
}
</style>
