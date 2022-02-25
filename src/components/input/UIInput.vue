<template>
    <div class="ui-text" :class="$attrs.class">
        <UIExpandTransition>
            <label v-if="label || $slots.label"
                   :for="$attrs.id ?? name"
                   class="font-medium text-color inline-flex"
                   :class="{ 'text-color-error': error || $slots.error }">
                <slot name="label">
                    {{ label }}
                </slot>
            </label>
        </UIExpandTransition>

        <div class="shadow-sm dark:shadow-md border border-gray-300 dark:border-gray-500 rounded
                    bg-white dark:bg-gray-600 transition"
             :class="{
                 'bg-gray-200 dark:!bg-gray-700 cursor-not-allowed': disabled,
                 'focus-within:border-blue-400 dark:focus-within:border-blue-500': !(error || $slots.error),
                 'border-red-700 dark:!border-red-500': error || $slots.error
             }"
             :style="$attrs.style">
            <div class="flex items-center">
                <template v-if="isPasswordInitially && !disablePasswordToggle">
                    <button v-if="inputType === 'password'"
                            class="ml-3 -mr-1 p-1 text-color-muted pass-toggle"
                            @click="inputType = 'text'"
                            v-html="hideIcon" />
                    <button v-else
                            class="ml-3 -mr-1 p-1 text-color-muted pass-toggle"
                            @click="inputType = 'password'"
                            v-html="showIcon" />
                </template>
                <span v-if="prefix ?? $slots.prefix"
                      class="prefix ml-3 -mr-1 select-none text-color-muted"
                      :class="{ 'ml-5 -mr-4': large }">
                    <slot name="prefix">
                        {{ prefix }}
                    </slot>
                </span>

                <input :id="$attrs.id ?? name"
                       v-bind="omit($attrs, ['class', 'style', 'type', 'min', 'max', 'step'])"
                       ref="input"
                       v-model="model"
                       :type="inputType"
                       :name="name"
                       :step="step"
                       :min="min"
                       :max="max"
                       :placeholder="placeholder"
                       :aria-placeholder="placeholder"
                       class="flex-1 p-3.5 appearance-none bg-transparent outline-none
                              text-color disabled:text-gray-400 overflow-x-scroll"
                       :disabled="disabled"
                       :class="{ 'px-7 py-5': large }"
                       @keydown="handleKeydown">

                <span v-if="suffix ?? $slots.suffix"
                      :class="{ 'mr-5': large }"
                      class="suffix mr-3 select-none text-color-muted">
                    <slot name="suffix">
                        {{ suffix }}
                    </slot>
                </span>

                <UIFadeTransition duration-out="duration-100" duration-in="duration-100">
                    <span v-if="disabled"
                          class="h-5 w-5 mr-3 text-color-muted"
                          :class="{ 'mr-5': large }"
                          v-html="lockIcon" />

                    <button v-else-if="clearable && model"
                            class="clear-icon h-5 w-5 cursor-pointer mr-3 text-color-muted"
                            :class="{ 'mr-5': large }"
                            :aria-controls="$attrs.id ?? name"
                            aria-roledescription="clear"
                            @click="model = ''"
                            v-html="clearIcon" />
                </UIFadeTransition>

                <div v-if="inputType === 'number'" class="flex flex-col select-none min-h-full self-stretch">
                    <button :aria-controls="$attrs.id ?? name"
                            aria-roledescription="increment"
                            class="px-2 transition-colors h-full rounded-bl rotate-180
                                   bg-gray-50 hover:bg-gray-200
                                   dark:bg-gray-500 dark:text-white dark:hover:bg-gray-400"
                            @click="increment"
                            v-html="chevronIcon" />
                    <button :aria-controls="$attrs.id ?? name"
                            aria-roledescription="decrement"
                            class="px-2 transition-colors h-full rounded-br
                                   bg-gray-50 hover:bg-gray-200 focus:z-10
                                   dark:bg-gray-500 dark:text-white dark:hover:bg-gray-400"
                            @click="decrement"
                            v-html="chevronIcon" />
                </div>
            </div>
        </div>

        <UIExpandTransition>
            <slot v-if="error || $slots.error" name="error">
                <p class="text-color-error text-sm">
                    {{ error }}
                </p>
            </slot>
        </UIExpandTransition>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import {
    autofocus,
    label,
    prefix,
    suffix,
    name,
    clearable,
    disabled,
    error,
    placeholder,
    large
} from '@/shared-props';
import { useVModel } from 'composables/reactivity';
import { getIcon, getPrecision } from '@/helpers';
import { omit } from 'lodash-es';
import UIFadeTransition from 'components/transitions/UIFadeTransition.vue';
import UIExpandTransition from 'components/transitions/UIExpandTransition.vue';

const types = [
    'text',
    'tel',
    'number',
    'password',
    'url',
    'email',
    'search'
] as const;

export default defineComponent({
    name: 'UIInput',

    components: { UIFadeTransition, UIExpandTransition },

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [String, Number]
        },

        /**
         * The types the component can handle.
         *
         * @default 'text'
         */
        type: {
            type: String as PropType<typeof types[number]>,
            default: 'text',
            validator: (type: string) => types.includes(type.toLowerCase() as typeof types[number])
        },

        /**
         * Whether to disable the functionality to show the password in clear text.
         *
         * @default false
         */
        disablePasswordToggle: {
            type: Boolean,
            default: false
        },

        /**
         * The time in milliseconds after the visible password turns back to hidden.
         * To disable, set the value to 0.
         *
         * @default 4000
         */
        passwordToggleTimeout: {
            type: Number,
            default: 4000
        },

        /**
         * The minimum value if input is of number type.
         */
        min: {
            type: [Number, String]
        },

        /**
         * The maximum value if input is of number type.
         */
        max: {
            type: [Number, String]
        },

        /**
         * The value to increment/decrement by if the input is of number type.
         */
        step: {
            type: [Number, String]
        },

        large,
        prefix,
        suffix,
        label,
        autofocus,
        clearable,
        name,
        disabled,
        error,
        placeholder
    },

    emits: ['update:modelValue'],

    setup(props) {
        const input = ref<HTMLInputElement>();
        const inputType = ref(props.type);

        const lockIcon = getIcon('lock');
        const clearIcon = getIcon('clear');
        const chevronIcon = getIcon('chevron');
        const showIcon = getIcon('show');
        const hideIcon = getIcon('hide');
        const isPasswordInitially = inputType.value === 'password';
        let timeoutId: number;

        const model = useVModel<string | number>(props);

        if (props.autofocus) {
            onMounted(() => {
                input.value?.focus();
            });
        }

        const handleKeydown = (event: KeyboardEvent) => {
            if (inputType.value === 'number') {
                switch (event.code) {
                    case 'ArrowUp':
                        increment();
                        event.preventDefault();
                        return;
                    case 'ArrowDown':
                        decrement();
                        event.preventDefault();
                        return;
                    default:
                        break;
                }

                if (event.code === 'Backspace'
                    || event.code === 'Period' && !String(model.value).includes('.')
                    || event.code === 'Tab'
                ) {
                    return;
                }

                if (!event.code.includes('Digit')) {
                    event.preventDefault();
                }
            }
        };
        const increment = () => {
            const step = Number(props.step) || 1;
            const max = Number(props.max);
            const min = Number(props.min);
            const nextValue = Number((Number(model.value) + step).toFixed(getPrecision(step)));

            if (nextValue < min) {
                model.value = min;
                return;
            }

            if (isNaN(max)) {
                model.value = isNaN(Number(model.value)) ? step : nextValue;
                return;
            }

            if (isNaN(Number(model.value))) {
                model.value = max < 0 ? max : step;
                return;
            }

            if (nextValue <= max) {
                model.value = nextValue;
                return;
            }

            model.value = max;
        };
        const decrement = () => {
            const step = Number(props.step) || 1;
            const min = Number(props.min);
            const max = Number(props.max);
            const nextValue = Number((Number(model.value) - step).toFixed(getPrecision(step)));

            if (nextValue > max) {
                model.value = max;
                return;
            }

            if (isNaN(min)) {
                model.value = isNaN(Number(model.value)) ? -step : nextValue;
                return;
            }

            if (isNaN(Number(model.value))) {
                model.value = min ?? 0 - step;
                return;
            }

            if (nextValue >= min) {
                model.value = nextValue;
                return;
            }

            model.value = min;
        };

        watch(() => props.type, type => {
            inputType.value = type.toLowerCase() as typeof types[number];
        });
        watch(() => inputType.value, newType => {
            if (isPasswordInitially && props.passwordToggleTimeout) {
                if (newType === 'text') {
                    timeoutId = setTimeout(() => inputType.value = 'password', props.passwordToggleTimeout);
                } else {
                    clearTimeout(timeoutId);
                }
            }
        });

        return {
            model,
            input,
            inputType,
            lockIcon,
            clearIcon,
            chevronIcon,
            showIcon,
            hideIcon,
            isPasswordInitially,
            omit,
            increment,
            decrement,
            handleKeydown
        };
    }
});
</script>

<style scoped>
input::-webkit-search-cancel-button,
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
}

input:disabled[type=number] {
    -moz-appearance: textfield;
}

.prefix, .suffix, .pass-toggle {
    line-height: 1.28;
}
</style>
