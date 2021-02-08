<template>
    <div class="ui-text">
        <label :for="$attrs.id ?? $attrs.name" class="text-sm text-gray-500">
            {{ label }}
        </label>

        <div class="group relative container">
            <div class="flex overflow-hidden relative">
                <textarea :id="$attrs.id ?? $attrs.name"
                          v-bind="$attrs"
                          ref="input"
                          class="flex-1 appearance-none bg-transparent transition-border-color leading-tight
                                 focus:outline-none rounded-none transition-text-color disabled:cursor-not-allowed
                                 disabled:text-gray-400"
                          :value="modelValue"
                          :style="$attrs.disabled || fixed ? 'resize: none' : ''"
                          @input="$emit('update:modelValue', $event.target.value)" />

                <svg v-if="$attrs.disabled"
                     class="h-5 w-5 text-gray-400 right-0 top-1 absolute"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2
                             2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clip-rule="evenodd" />
                </svg>

                <svg v-else-if="!noClear && modelValue"
                     class="clear-icon h-5 w-5 cursor-pointer right-0 top-1 group-hover:opacity-100 transition-opacity
                            text-gray-500 absolute -mr-5 group-hover:mr-2 -mt-1 transition-spacing"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     @click="clearInput">
                    <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293
                             4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0
                             01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd" />
                </svg>
            </div>

            <div class="absolute w-full border-b left-0 bottom-0" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { SetupReturn } from '@/types';
import {
    autofocus,
    label,
    autofocusElement,
    useClearModelValue,
    noClear
} from '@composables/input/input';

export default defineComponent({
    name: 'UIText',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [String, Number],
            required: true
        },

        fixed: Boolean,
        label,
        autofocus,
        noClear
    },

    emits: ['update:modelValue'],

    setup(props, { emit, attrs }): SetupReturn {
        const input = ref<HTMLInputElement>();
        const clearInput = useClearModelValue(emit);
        const isNumber = computed(() => attrs.type === 'number');
        autofocusElement(props.autofocus, input);

        return {
            input,
            clearInput,
            isNumber
        };
    }
});
</script>
