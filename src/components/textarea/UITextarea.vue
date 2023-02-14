<template>
    <div class="ui-textarea relative">
        <UIExpandTransition>
            <label v-if="label || $slots.label"
                   :for="$attrs.id ?? name"
                   class="font-medium text-color inline-flex items-center mb-1.5"
                   :class="{ 'text-color-error': error || $slots.error }">
                <slot name="label">
                    {{ label }}
                </slot>
            </label>
        </UIExpandTransition>

        <div class="group relative shadow-sm dark:shadow-md border border-gray-300 dark:border-gray-500 rounded
                    bg-white dark:bg-gray-600 transition"
             :class="{
                 'bg-gray-200 dark:!bg-gray-700': disabled,
                 'focus-within:border-blue-400 dark:focus-within:border-blue-500': !(error || $slots.error),
                 'border-red-700 dark:border-red-500': error || $slots.error
             }">
            <div class="flex items-center items-stretch">
                <textarea :id="$attrs.id ?? name"
                          v-bind="$attrs"
                          ref="input"
                          v-model="model"
                          :placeholder="placeholder"
                          spellcheck="true"
                          :name="name"
                          :disabled="disabled"
                          :aria-placeholder="placeholder"
                          class="flex-1 p-3.5 appearance-none bg-transparent outline-none caret-blue-500
                                 disabled:cursor-not-allowed text-color disabled:text-gray-400"
                          :class="{
                              'px-7 py-5': large,
                              '!p-2': small,
                              'caret-red-500 dark:caret-red-600': error || $slots.error
                          }"
                          :style="[
                              disabled || fixed || autoSize ? 'resize: none' : '',
                              counter ? 'min-height: 5rem' : '']" />

                <div class="flex flex-col justify-center" :class="{ 'text-gray-400 cursor-not-allowed': disabled }">
                    <UIFadeTransition duration-out="duration-100" duration-in="duration-100">
                        <span v-if="disabled"
                              class="h-5 w-5 mx-2 text-color-muted grow align-middle flex flex-col justify-center"
                              v-html="lockIcon" />

                        <UISpinnerLoader v-else-if="loading"
                                         :diameter="20"
                                         :stroke="2"
                                         class="mx-2" />

                        <button v-else-if="clearable && model"
                                class="clear-icon h-5 w-5 mx-2 text-color-muted"
                                :aria-controls="$attrs.id ?? name"
                                aria-roledescription="clear"
                                @click="model = ''"
                                v-html="clearIcon" />
                    </UIFadeTransition>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-end flex-nowrap">
            <UIExpandTransition>
                <div v-if="error || $slots.error" class="grow">
                    <slot name="error">
                        <p class="text-red-700 dark:text-red-600 text-sm grow">
                            {{ error }}
                        </p>
                    </slot>
                </div>
            </UIExpandTransition>
            <UIFadeTransition>
                <span v-if="counter && modelValue"
                      class="text-sm px-1 text-color-muted transition-colors"
                      :class="{ 'text-color-error': error || $slots.error }">
                    {{ modelValue.length }}
                </span>
            </UIFadeTransition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated, onBeforeUnmount } from 'vue';
import {
    autofocus,
    label,
    clearable,
    name,
    disabled,
    placeholder,
    large,
    error,
    loading,
    small
} from '@/shared-props';
import { getIcon } from '@/helpers';
import { useVModel } from 'composables/reactivity';
import UIExpandTransition from 'components/transitions/UIExpandTransition.vue';
import UIFadeTransition from 'components/transitions/UIFadeTransition.vue';
import UISpinnerLoader from 'components/loader-spinner/UISpinnerLoader.vue';

export default defineComponent({
    name: 'UITextarea',

    components: { UIExpandTransition, UIFadeTransition, UISpinnerLoader },

    inheritAttrs: false,

    props: {
        modelValue: {
            type: String
        },

        /**
         * Flag to enable auto-sizing the text area's height.
         *
         * @default false
         */
        autoSize: {
            type: Boolean,
            default: false
        },

        /**
         * Display a count of the characters currently in the textarea.
         *
         * @default false
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
        disabled,
        error,
        placeholder,
        large,
        loading,
        small
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

        onMounted(() => {
            if (props.autoSize) {
                input.value!.addEventListener('input', setHeight);
            }

            if (props.autofocus) {
                input.value?.focus();
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
