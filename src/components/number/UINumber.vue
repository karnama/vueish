<template>
    <div class="ui-number">
        <label :for="name" class="text-sm text-gray-500">
            {{ label }}
        </label>

        <div class="relative group">
            <div class="flex">
                <span v-if="prefix || $slots.prefix" class="prefix mr-1">
                    <slot name="prefix">
                        {{ prefix }}
                    </slot>
                </span>
                <input class="flex-1 appearance-none bg-transparent transition-border-color w-full leading-tight focus:outline-none rounded-none transition-text-color pb-2 disabled:cursor-not-allowed disabled:text-gray-400"
                       :id="name"
                       :name="name"
                       :disabled="disabled"
                       :value="modelValue"
                       :max="max"
                       :min="min"
                       :step="step"
                       type="number"
                       @input="$emit('update:modelValue', Number($event.target.value))"
                       v-bind="$attrs"
                       @keypress="onlyNumber"
                       ref="input"/>
                <span v-if="suffix || $slots.suffix" class="suffix ml-1 absolute right-5">
                    <slot name="suffix">
                        {{ suffix }}
                    </slot>
                </span>
            </div>

            <svg v-if="disabled"
                 class="h-5 w-5 text-gray-400 absolute right-0 top-0"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
                 fill="currentColor">
                <path fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"/>
            </svg>

            <div class="absolute w-full border-b left-0 bottom-0"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
    name: 'UINumber',

    props: {
        /**
         * Bound value.
         */
        modelValue: {
            type: Number,
            required: true
        },

        /**
         * String name used to reference the input.
         */
        name: {
            type: String,
            required: true
        },

        /**
         * String to use as the input label.
         */
        label: String,

        /**
         * Boolean flag to indicate whether the input
         * should focus on load.
         */
        autofocus: {
            type: Boolean,
            default: false
        },

        /**
         * Boolean flag to enable/disable the input.
         */
        disabled: {
            type: Boolean,
            default: false
        },

        /**
         * Max value that can be entered.
         */
        max: {
            type: Number,
            default: 2147483647
        },

        /**
         * Min value that can be entered.
         */
        min: {
            type: Number,
            default: 0
        },

        /**
         * The amount increase/decrease the value by.
         */
        step: {
            type: Number,
            default: 1
        },

        /**
         * String to prefix the input with, eg: £.
         */
        prefix: String,

        /**
         * String to suffix the input with, eg: £.
         */
        suffix: String
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const input = ref('');

        /**
         * Focus on the input.
         */
        function focus() {
            input.value.focus();
        }

        onMounted(() => {
            if (props.autofocus) {
                focus();
            }
        });

        const onlyNumber = (event: any) => {
            let keyCode = (event.keyCode ? event.keyCode : event.which);

            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                event.preventDefault();
            }
        };

        return { focus, input, onlyNumber };
    }
});
</script>

<style scoped>
/*https://stackoverflow.com/a/4298216*/
input:disabled::-webkit-outer-spin-button,
input:disabled::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input:disabled[type=number] {
    -moz-appearance: textfield; /* Firefox */
}

.prefix, .suffix {
    line-height: 1.28;
}
</style>
