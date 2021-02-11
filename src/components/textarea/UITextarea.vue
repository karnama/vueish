<template>
    <div class="ui-text">
        <label :for="$attrs.id ?? name" class="text-sm text-gray-500">
            {{ label }}
        </label>

        <div class="group relative container">
            <div class="flex overflow-hidden relative">
                <textarea :id="$attrs.id ?? name"
                          v-bind="$attrs"
                          ref="input"
                          v-model="value"
                          :name="name"
                          :disabled="disabled"
                          class="flex-1 appearance-none bg-transparent transition-border-color leading-tight
                                 focus:outline-none rounded-none transition-text-color disabled:cursor-not-allowed
                                 disabled:text-gray-400"
                          :style="disabled || fixed ? 'resize: none' : ''" />

                <span v-if="disabled"
                      class="h-5 w-5 text-gray-400"
                      v-html="lockIcon" />


                <span v-else-if="!noClear && modelValue"
                      class="clear-icon h-5 w-5 cursor-pointer right-0 top-1 group-hover:opacity-100 transition-opacity
                            text-gray-500 relative -mr-5 group-hover:mr-0 -mt-1 transition-spacing"
                      @click="value = ''"
                      v-html="clearIcon" />
            </div>

            <div class="absolute w-full border-b left-0 bottom-0" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SetupReturn } from '@/types';
import {
    autofocus,
    label,
    autofocusElement,
    noClear,
    name,
    disabled, useVModel
} from '@composables/input';
import { getIcon } from '@/helpers';

export default defineComponent({
    name: 'UIText',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: String,
            required: true
        },

        fixed: Boolean,
        label,
        autofocus,
        noClear,
        name,
        disabled
    },

    emits: ['update:modelValue'],

    setup(props): SetupReturn {
        const input = ref<HTMLInputElement>();
        const value = useVModel<string>(props);
        const lockIcon = getIcon('lock');
        const clearIcon = getIcon('clear');
        autofocusElement(props.autofocus, input);

        return {
            value,
            input,
            lockIcon,
            clearIcon
        };
    }
});
</script>
