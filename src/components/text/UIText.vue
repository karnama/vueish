<template>
    <div class="ui-text">
        <label :for="name" class=text-sm>
            {{ label }}
        </label>

        <div class="relative group">
            <input class="appearance-none bg-transparent transition-border-color border-b  w-full leading-tight focus:outline-none rounded-none transition-text-color pb-2 disabled:cursor-not-allowed disabled:text-gray-400"
                   :id="name"
                   :name="name"
                   :disabled="disabled"
                   :placeholder="placeholder"
                   :value="modelValue"
                   @input="$emit('update:modelValue', $event.target.value)"
                   v-bind="$attrs"
                   ref="input"/>

            <svg v-if="disabled"
                 class="h-5 w-5 text-gray-400 absolute right-0 top-1"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
                 fill="currentColor">
                <path fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"/>
            </svg>

            <svg v-else-if="modelValue"
                 class="clear-icon h-5 w-5 absolute cursor-pointer right-0 top-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
                 fill="currentColor"
                 @click="clearSelection">
                <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    name: 'UIText',

    props: {
        modelValue: {
            type: String,
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
         * String label to use as the button text.
         */
        label: String,

        /**
         * String label to use as placeholder.
         */
        placeholder: String,

        /**
         * Boolean flag to indicate whether the input
         * should focus on load.
         */
        autofocus: {
            type: Boolean,
            default: false
        },

        /**
         * Boolean flag to enable/disable the button.
         */
        disabled: {
            type: Boolean,
            default: false
        }
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const input = ref('');

        function focus() {
            input.value.focus();
        }

        function clearSelection() {
            emit('update:modelValue', '');
        }

        onMounted(() => {
            if (props.autofocus) {
                focus();
            }
        });

        return { focus, input, clearSelection };
    },

    methods: {}
});
</script>
