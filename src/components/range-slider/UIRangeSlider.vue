<template>
    <label class="mt-4">
        <slot name="label">
            {{ label }}
        </slot>
        <div class="relative block">
            <div class="range-value opacity-100 transition-opacity transform -translate-y-full flex items-center justify-center"
                 :class="{ 'opacity-100': showLabel }"
                 :style="leftOffset">
                <svg class="range-thumb-indicator opacity-100 transition-opacity fill-current text-brand-400"
                     :class="{ 'opacity-100': showLabel }"
                     viewBox="0 0 80 90"
                     :data-value="model">
                    <path d="M40 99.5 C-22.5 47.5 0 0 40 0.5 C80 0 102.5 47.5 40 99.5z" />
                </svg>
                <span class="absolute text-sm">
                    {{ model }}
                </span>
            </div>
            <input :id="$attrs.id ?? name"
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
                   @mousedown="showLabel = true"
                   @touchend="closeLabel"
                   @mouseup="closeLabel">
        </div>
    </label>

    <div>
        Percentage of the slider travel: {{ progress() }}%
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useVModel } from '@composables/input';
import { disabled, name, label } from '@composables/input';

// todo - mobile touch doesn't work

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

        function progress() {
            return Number((model.value - props.min) * 100 / (props.max - props.min));
        }

        // const realPercentage = computed<number>(() => {
        //     const range = Math.abs(props.min - Math.abs(props.max));
        //     const offset = Math.abs(0 - Math.abs(props.min));
        //     return (Number(model.value) + offset) / range * 100;
        // });

        // const bgColor = computed<Partial<CSSStyleDeclaration>>(() => {
        //     return {
        //         backgroundImage:
        //             `-webkit-gradient(linear, left top, right top,
        //             color-stop(${realPercentage.value / 100}, ${props.disabled ? 'rgba(0,0,0,0)' : 'red'}),
        //             color-stop(${realPercentage.value / 100}, rgba(0,0,0,0)))`
        //     };
        // });

        const bgColor = computed<Partial<CSSStyleDeclaration>>(() => {
            return {
                background: `linear-gradient(90deg, blue ${progress()}%,white ${progress()}%)`
            };
        });

        // const leftOffset = computed<Partial<CSSStyleDeclaration>>(() => {
        //     return {
        //         left: `calc(${realPercentage.value}% - ${/* $range-handle-size */25 / 100 * realPercentage.value}px)`
        //     };
        // });

        const leftOffset = computed<Partial<CSSStyleDeclaration>>(() => {
            // 5px is the half-width of the svg minus the half-width of the thumb.
            return { left: `calc(${progress()}% - ${/* $range-handle-size */25 / 100 * progress()}px - 5px)` };
        });

        const closeLabel = () => setTimeout(() => showLabel.value = false, 750);

        return {
            model,
            showLabel,
            bgColor,
            leftOffset,
            closeLabel,
            progress
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

    &:disabled {
        &::-moz-range-thumb, ::-webkit-slider-thumb {
            background: var(--color-bg-darker);
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
