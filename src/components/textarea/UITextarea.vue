<template>
    <div class="ui-textarea">
        <label :for="$attrs.id ?? name" class="font-medium text-gray-700">
            {{ label }}
        </label>

        <div class="group relative shadow border border-gray-300 rounded bg-white
                    transition focus-within:border-blue-400"
             :class="{ 'bg-gray-100': disabled }">
            <div class="flex items-center">
                <textarea :id="$attrs.id ?? name"
                          v-bind="$attrs"
                          ref="input"
                          v-model="model"
                          :name="name"
                          :disabled="disabled"
                          :aria-placeholder="$attrs.placeholder"
                          class="flex-1 p-3 appearance-none bg-transparent outline-none
                                 disabled:cursor-not-allowed disabled:text-gray-400"
                          :style="disabled || fixed ? 'resize: none' : ''" />

                <span v-if="disabled"
                      class="h-5 w-5 mr-3 text-gray-400"
                      v-html="lockIcon" />


                <button v-else-if="clearable && model"
                        class="clear-icon h-5 w-5 cursor-pointer mr-3 text-gray-500"
                        :aria-controls="$attrs.id ?? name"
                        aria-roledescription="clear"
                        @click="model = ''"
                        v-html="clearIcon" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
        autofocusElement(props.autofocus, input);

        return {
            model,
            input,
            lockIcon,
            clearIcon
        };
    }
});
</script>
