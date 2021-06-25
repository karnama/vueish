<template>
    <div class="ui-text" :class="$attrs.class">
        <label :for="$attrs.id ?? name"
               class="font-medium text-color"
               :class="{ 'text-color-error': error || $slots.error }">
            {{ label }}
        </label>

        <div class="group relative shadow-sm dark:shadow-md border border-gray-300 dark:border-gray-500 rounded
                    bg-white dark:bg-gray-600 transition"
             :class="{
                 'bg-gray-200 dark:!bg-gray-700': disabled,
                 'focus-within:border-blue-400 dark:focus-within:border-blue-500': !(error || $slots.error),
                 'border-red-700 dark:!border-red-500': error || $slots.error
             }"
             :style="$attrs.style">
            <div class="flex items-center">
                <span v-if="prefix ?? $slots.prefix"
                      class="prefix ml-3 -mr-1 select-none text-color-muted"
                      :class="{
                          'ml-5 -mr-4': large
                      }">
                    <slot name="prefix">
                        {{ prefix }}
                    </slot>
                </span>

                <input :id="$attrs.id ?? name"
                       v-bind="omit($attrs, ['class', 'style'])"
                       ref="input"
                       v-model="model"
                       :name="name"
                       :aria-placeholder="$attrs.placeholder"
                       class="flex-1 p-3.5 appearance-none bg-transparent outline-none
                              disabled:cursor-not-allowed text-color disabled:text-gray-400"
                       :disabled="disabled"
                       :class="{ 'px-7 py-5': large }"
                       @keydown="handleKeydown">

                <span v-if="suffix ?? $slots.suffix"
                      :class="{
                          'mr-5': large
                      }"
                      class="suffix mr-3 select-none text-color-muted">
                    <slot name="suffix">
                        {{ suffix }}
                    </slot>
                </span>

                <span v-if="disabled"
                      class="h-5 w-5 mr-3 text-color-muted"
                      :class="{
                          'mr-5': large
                      }"
                      v-html="lockIcon" />

                <button v-else-if="clearable && model"
                        class="clear-icon h-5 w-5 cursor-pointer mr-3 text-color-muted"
                        :class="{
                            'mr-5': large
                        }"
                        :aria-controls="$attrs.id ?? name"
                        aria-roledescription="clear"
                        @click="model = ''"
                        v-html="clearIcon" />

                <div v-if="isNumber" class="flex flex-col select-none min-h-full self-stretch">
                    <button :aria-controls="$attrs.id ?? name"
                            aria-roledescription="increment"
                            tabindex="-1"
                            class="px-2 transition-colors h-full cursor-pointer rounded-bl transform rotate-180
                                   bg-gray-50 hover:bg-gray-200
                                   dark:bg-gray-500 dark:text-white dark:hover:bg-gray-400"
                            @click="increment"
                            v-html="chevronIcon" />
                    <button :aria-controls="$attrs.id ?? name"
                            aria-roledescription="decrement"
                            tabindex="-1"
                            class="px-2 transition-colors h-full cursor-pointer rounded-br
                                   bg-gray-50 hover:bg-gray-200
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
import { computed, defineComponent, ref } from 'vue';
import {
    autofocus,
    label,
    prefix,
    suffix,
    name,
    autofocusElement,
    clearable,
    disabled,
    useVModel,
    error
} from '@composables/input';
import { large } from '@composables/style';
import { getIcon, getPrecision } from '@/helpers';
import { omit } from 'lodash-es';
import UIExpandTransition from '@components/transitions/UIExpandTransition.vue';

export default defineComponent({
    name: 'UIInput',

    components: { UIExpandTransition },

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [String, Number]
        },

        large,
        prefix,
        suffix,
        label,
        autofocus,
        clearable,
        name,
        disabled,
        error
    },

    emits: ['update:modelValue'],

    setup(props, ctx) {
        const input = ref<HTMLInputElement>();
        const isNumber = computed(() => ctx.attrs.type === 'number');
        const lockIcon = getIcon('lock');
        const clearIcon = getIcon('clear');
        const chevronIcon = getIcon('chevron');
        const model = useVModel<string | number>(props);

        autofocusElement(props.autofocus, input);

        const handleKeydown = (event: KeyboardEvent) => {
            if (isNumber.value) {
                switch (event.code) {
                    case 'ArrowUp':
                        increment();
                        event.preventDefault();
                        break;
                    case 'ArrowDown':
                        decrement();
                        event.preventDefault();
                        break;
                    default:
                        break;
                }
            }
        };
        const increment = () => {
            const step = Number(ctx.attrs.step) || 1;
            const max = Number(ctx.attrs.max);
            const min = Number(ctx.attrs.min);
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
            const step = Number(ctx.attrs.step) || 1;
            const min = Number(ctx.attrs.min);
            const max = Number(ctx.attrs.max);
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

        return {
            model,
            input,
            handleKeydown,
            isNumber,
            lockIcon,
            clearIcon,
            chevronIcon,
            omit,
            increment,
            decrement
        };
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


input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
}

input:disabled[type=number] {
    -moz-appearance: textfield;
}

.prefix, .suffix {
    line-height: 1.28;
}
</style>
