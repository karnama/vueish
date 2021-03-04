<template>
    <div class="ui-text" :class="$attrs.class">
        <label :for="$attrs.id ?? name" class="font-medium text-gray-700">
            {{ label }}
        </label>

        <div class="relative group shadow-sm border border-gray-300 rounded
                    bg-white transition focus-within:border-blue-400"
             :class="{ 'bg-gray-100': disabled }"
             :style="$attrs.style">
            <div class="flex items-center">
                <span v-if="prefix ?? $slots.prefix" class="prefix ml-3 select-none">
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
                       class="flex-1 p-3 appearance-none bg-transparent outline-none
                              disabled:cursor-not-allowed disabled:text-gray-400"
                       :disabled="disabled"
                       @keydown="handleKeydown">

                <span v-if="suffix ?? $slots.suffix"
                      class="suffix mr-3 select-none">
                    <slot name="suffix">
                        {{ suffix }}
                    </slot>
                </span>

                <span v-if="disabled"
                      class="h-5 w-5 mr-2 text-gray-400"
                      v-html="lockIcon" />

                <span v-else-if="clearable && modelValue"
                      class="clear-icon h-5 w-5 cursor-pointer mr-2 text-gray-500"
                      :aria-controls="$attrs.id ?? name"
                      aria-roledescription="clear"
                      @click="model = ''"
                      v-html="clearIcon" />

                <div v-if="isNumber" class="flex flex-col select-none h-full">
                    <button :aria-controls="$attrs.id ?? name"
                            aria-roledescription="increment"
                            tabindex="-1"
                            class="px-2 bg-gray-50 transition hover:bg-gray-200 cursor-pointer rounded-tr"
                            @click="increment">
                        ^
                    </button>
                    <button :aria-controls="$attrs.id ?? name"
                            aria-roledescription="decrement"
                            tabindex="-1"
                            class="px-2 bg-gray-50 transition hover:bg-gray-200 cursor-pointer
                                   transform rotate-180 rounded-tl"
                            @click="decrement">
                        ^
                    </button>
                </div>
            </div>
        </div>
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
    useVModel
} from '@composables/input';
import { getIcon, getPrecision } from '@/helpers';
import { omit } from 'lodash-es';

export default defineComponent({
    name: 'UIInput',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [String, Number],
            required: true
        },

        prefix,
        suffix,
        label,
        autofocus,
        clearable,
        name,
        disabled
    },

    emits: ['update:modelValue'],

    setup(props, ctx) {
        const input = ref<HTMLInputElement>();
        const isNumber = computed(() => ctx.attrs.type === 'number');
        const lockIcon = getIcon('lock');
        const clearIcon = getIcon('clear');
        const model = useVModel<string | number>(props);
        const handleKeydown = (event: KeyboardEvent) => {
            if (isNumber.value) {
                switch (event.key) {
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
        autofocusElement(props.autofocus, input);
        const increment = () => {
            const step = Number(ctx.attrs.step) || 1;
            const max = Number(ctx.attrs.max);
            const min = Number(ctx.attrs.min);
            const nextValue = (Number(model.value) + step).toFixed(getPrecision(step));

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
            const nextValue = (Number(model.value) - step).toFixed(getPrecision(step));

            if (nextValue > max) {
                model.value = max;
                return;
            }

            if (isNaN(min)) {
                model.value = isNaN(Number(model.value)) ? -step : nextValue;
                return;
            }

            if (isNaN(Number(model.value))) {
                model.value = min > 0 ? min : -step;
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
