<template>
    <label class="mt-4">
        <slot name="label" :value="model">
            {{ label }}
        </slot>
        <teleport to="body">
            <span ref="labelElement"
                  class="range-value opacity-0 transition-opacity px-2 py-1
                             bg-brand-400 rounded text-center text-white absolute"
                  :class="{ 'opacity-100': showLabel }"
                  :style="position">
                {{ model }}
            </span>
        </teleport>
        <input ref="range"
               v-model="model"
               type="range"
               class="range-slider-range bg-darker outline-none text-white transition-all border-0 w-full"
               :style="bgColor"
               :step="step"
               v-bind="$attrs"
               :name="name"
               :disabled="disabled"
               :min="min"
               :max="max"
               @touchstart="showLabel = true"
               @mouseover="showLabel = true"
               @touchend="showLabel = false"
               @mouseout="showLabel = false">
    </label>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useVModel } from '@composables/input';
import { disabled, name, label } from '@composables/input';

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
         * Display the floating label while using
         */
        withMarker: {
            type: Boolean,
            default: false
        },

        label,
        disabled,
        name
    },

    emits: ['update:modelValue'],

    setup(props) {
        const showLabel = ref(false);
        const range = ref<HTMLInputElement>();
        const labelElement = ref<HTMLSpanElement>();
        const model = useVModel<number>(props);
        const progress = computed(() =>
            (Number(model.value) - Number(props.min)) * 100 / (Number(props.max) - Number(props.min))
        );

        const bgColor = computed<Partial<CSSStyleDeclaration>>(() => {
            return {
                backgroundImage:
                    `-webkit-gradient(linear, left top, right top,
                    color-stop(${progress.value / 100},
                        ${props.disabled? 'rgba(0,0,0,0)' : 'rgba(var(--color-brand-400), 1)'}),
                    color-stop(${progress.value / 100}, rgba(0,0,0,0)))`
            };
        });
        const position = ref<Partial<CSSStyleDeclaration>>({});

        watch(
            () => progress.value,
            (val: number) => {
                const rangeRect = range.value?.getBoundingClientRect();
                const labelRect = labelElement.value?.getBoundingClientRect();
                const rangeHandleSize = 25;

                if (!rangeRect || !labelRect) return;

                position.value.top = `calc(${rangeRect.y}px - ${labelRect.height}px - ${rangeHandleSize / 2}px - 5px)`;
                position.value.left = `calc(${rangeRect.left}px + ${rangeRect.width / 100 * val}px - ${rangeHandleSize / 100 * val}px)`;
            });


        return {
            model,
            showLabel,
            bgColor,
            position,
            range,
            labelElement
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
