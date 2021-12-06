<template>
    <label class="mt-4">
        <slot name="label" :value="model">
            {{ label }}
        </slot>
        <span class="relative block">
            <svg class="range-thumb-indicator opacity-0 transition-opacity range-value fill-current text-brand-400"
                 :class="{ 'opacity-100': showLabel }"
                 viewBox="0 0 80 90"
                 :data-value="model"
                 :style="leftOffset">
                <path d="M40 99.5 C-22.5 47.5 0 0 40 0.5 C80 0 102.5 47.5 40 99.5z" />
            </svg>
            <span class="range-value opacity-0 transition-opacity"
                  :class="{ 'opacity-100': showLabel }"
                  :style="leftOffset"
                  :data-value="model" />
            <input v-model="model"
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
                   @mousedown="showLabel = true"
                   @touchend="closeLabel"
                   @mouseup="closeLabel">
        </span>
    </label>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useVModel } from 'composables/input';
import { disabled, name, label } from 'composables/input';

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

        label,
        disabled,
        name
    },

    emits: ['update:modelValue'],

    setup(props) {
        const showLabel = ref(false);
        const model = useVModel<number>(props);
        const progress = computed(() => {
            return Number(model.value) - Number(props.min) * 100 / Number(props.max) - Number(props.min);
        });

        const bgColor = computed<Partial<CSSStyleDeclaration>>(() => {
            return {
                backgroundImage:
                    `-webkit-gradient(linear, left top, right top,
                    color-stop(${progress.value / 100},
                        ${props.disabled? 'rgba(0,0,0,0)' : 'rgba(var(--color-brand-400), 1)'}),
                    color-stop(${progress.value / 100}, rgba(0,0,0,0)))`
            };
        });

        const leftOffset = computed<Partial<CSSStyleDeclaration>>(() => {
            // offset by the $range-handle-size and 5px which is the half width of the svg
            return { left: `calc(${progress.value}% - ${25 / 100 * progress.value}px - 5px)` };
        });

        const closeLabel = () => {
            timeoutId = setTimeout(() => showLabel.value = false, 750);
        };
        const openLabel = () => {
            clearTimeout(timeoutId);
            showLabel.value = true;
        };

        return {
            model,
            showLabel,
            bgColor,
            leftOffset,
            closeLabel,
            openLabel
        };
    }
});
</script>

<style lang="scss" scoped>
$shadow: 0px 0px 2px #00000061;
$range-handle-size: 25px;

$indicatorWidth: 35px;
$indicatorHeight: 50px;
.range-thumb-indicator {
    height: $indicatorHeight;
    width: $indicatorWidth;
}

.range-value {
    text-align: center;
    height: $indicatorHeight;
    width: $indicatorWidth;
    position: absolute;
    top: -$indicatorHeight;
    &:after {
        display: block;
        font-size: 0.8rem;
        word-break: break-all;
        content: attr(data-value);
        padding-top: .5rem;
    }
}

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

.indicator {
    min-width: 20px;
}
</style>
