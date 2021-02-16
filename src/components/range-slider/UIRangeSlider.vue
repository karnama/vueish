<template>
    <div class="range-slider relative flex align-middle flex-no-wrap justify-between items-center mt-4 transition-all">
        <span class="rounded-full range-value">
            {{ model }}
        </span>
        <input :id="name"
               v-model="model"
               type="range"
               class="range-slider-range bg-darker outline-none text-white
                      hover:text-primary-light transition-all border-0 flex-grow"
               :style="bgColor"
               step="1"
               v-bind="$attrs"
               :name="name"
               :disabled="disabled"
               :min="min"
               :max="max"
               @mousedown="showLabel = true"
               @mouseup="closeLabel">
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useVModel } from '@composables/input';
import { disabled, name } from '@composables/input';

export default defineComponent({
    name: 'UIRangeSlider',

    inheritAttrs: false,

    props: {
        /**
         * Minimum value.
         *
         * @type {Number|Object}
         */
        min: {
            type: Number,
            default: 0
        },

        /**
         * Maximum value.
         *
         * @type {Number|Object}
         */
        max: {
            type: Number,
            default: 100
        },

        disabled,
        name
    },

    emits: ['update:modelValue'],

    setup(props) {
        const showLabel = ref(false);
        const model = useVModel<number>(props);

        const bgColor = computed<Partial<CSSStyleSheet>>(() => {
            return {
                backgroundImage:
                    `-webkit-gradient(linear, left top, right top,
                        color-stop(${model.value / 100}, ${props.disabled ? 'rgba(0,0,0,0)' : 'var(--color-primary)'})
                        color-stop(${model.value / 100}, rgba(0,0,0,0)))`
            };
        });

        const closeLabel = () => setTimeout(() => showLabel.value = false, 2000);

        return {
            showLabel,
            bgColor,
            closeLabel
        };
    }
});
</script>

<style lang="scss" scoped>
$shadow: 0px 0px 2px #00000061;

$range-handle-size: 25px;

.range-value {
    width: $range-handle-size;
    &:after {
        background: red;
        width: $range-handle-size;
        height: $range-handle-size;
        transform: rotate(45deg);
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
