<template>
    <div class="ui-textarea relative">
        <label :for="$attrs.id ?? name" class="font-medium text-gray-700">
            {{ label }}
        </label>

        <div class="group relative shadow border border-gray-300 rounded bg-white
                    transition focus-within:border-blue-400"
             :class="{ 'bg-gray-100': disabled }">
            <div class="flex items-center items-stretch">
                <textarea :id="$attrs.id ?? name"
                          v-bind="$attrs"
                          ref="input"
                          v-model="model"
                          :name="name"
                          :disabled="disabled"
                          :aria-placeholder="$attrs.placeholder"
                          class="flex-1 p-3 appearance-none bg-transparent outline-none
                                 disabled:cursor-not-allowed disabled:text-gray-400"
                          :style="[disabled || fixed || autoSize ? 'resize: none' : '', counter ? 'min-height: 5rem' : '']" />

                <div class="flex flex-col justify-between" :class="{ 'text-gray-400 cursor-not-allowed': disabled }">
                    <span v-if="disabled"
                          class="h-5 w-5 mx-2 text-gray-400 flex-grow align-middle flex flex-col justify-center"
                          v-html="lockIcon" />

                    <button v-else-if="clearable && model"
                            class="clear-icon h-5 w-5 cursor-pointer mx-2 text-gray-500 flex-grow"
                            :aria-controls="$attrs.id ?? name"
                            aria-roledescription="clear"
                            @click="model = ''"
                            v-html="clearIcon" />
                </div>
            </div>
        </div>
        <span v-if="counter && modelValue"
              class="text-sm px-1 text-center h-5 -bottom-5 right-0 absolute text-gray-500">
            {{ modelValue.length }}
        </span>
    </div>
</template>

<script lang="ts">
// absolute bottom-3 right-2
import { defineComponent, ref, onMounted, onUpdated, onBeforeUnmount } from 'vue';
import {
    autofocus,
    label,
    autofocusElement,
    clearable,
    name,
    disabled,
    useVModel
} from '@composables/input';
import { getIcon } from '@/helpers';

export default defineComponent({
    name: 'UITextArea',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: String,
            required: true
        },

        /**
         * Flag to enable auto-sizing the the text area's height.
         */
        autoSize: {
            type: Boolean,
            default: false
        },

        /**
         * Display a count of the characters currently in the textarea.
         */
        counter: {
            type: Boolean,
            default: false
        },

        fixed: Boolean,
        label,
        autofocus,
        clearable,
        name,
        disabled
    },

    emits: ['update:modelValue'],

    setup(props) {
        const input = ref<HTMLInputElement>();
        const model = useVModel<string>(props);
        const lockIcon = getIcon('lock');
        const clearIcon = getIcon('clear');

        const setHeight = () => {
            input.value!.style.height = 'auto';
            input.value!.style.height = `${input.value!.scrollHeight}px`;
        };

        autofocusElement(props.autofocus, input);

        onMounted(() => {
            if (props.autoSize) {
                input.value!.addEventListener('input', setHeight);
            }
        });
        onUpdated(() => {
            if (props.autoSize) {
                input.value!.addEventListener('input', setHeight);
            } else {
                input.value!.removeEventListener('input', setHeight);
            }
        });
        onBeforeUnmount(() => {
            input.value!.removeEventListener('input', setHeight);
        });

        return {
            model,
            input,
            lockIcon,
            clearIcon
        };
    }
});
</script>
