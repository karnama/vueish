<template>
    <div class="ui-text">
        <label :for="$attrs.id ?? name" class="text-sm text-gray-500">
            {{ label }}
        </label>

        <div class="relative group">
            <div class="flex overflow-hidden">
                <span v-if="prefix ?? $slots.prefix" class="prefix mr-1">
                    <slot name="prefix">
                        {{ prefix }}
                    </slot>
                </span>
                <input :id="$attrs.id ?? name"
                       v-bind="$attrs"
                       ref="input"
                       v-model="value"
                       :name="name"
                       class="flex-1 appearance-none bg-transparent transition-border-color leading-tight
                       focus:outline-none rounded-none transition-text-color pb-2 disabled:cursor-not-allowed
                       disabled:text-gray-400"
                       :disabled="disabled"
                       @keydown="handleKeydown">

                <span v-if="suffix ?? $slots.suffix"
                      class="suffix mr-1 right-0"
                      :class="{'right-5': isNumber}">
                    <slot name="suffix">
                        {{ suffix }}
                    </slot>
                </span>

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
import { computed, defineComponent, ref, SetupContext } from 'vue';
import { SetupReturn } from '@/types';
import {
    autofocus,
    label,
    prefix,
    suffix,
    autofocusElement,
    noClear,
    disabled, useVModel
} from '@composables/input';
import { onlyNumber } from './UIText';
import { getIcon } from '@/helpers';

export default defineComponent({
    name: 'UIText',

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
        noClear,
        name,
        disabled
    },

    emits: ['update:modelValue'],

    setup(props, ctx: SetupContext): SetupReturn {
        const input = ref<HTMLInputElement>();
        const isNumber = computed(() => ctx.attrs.type === 'number');
        const lockIcon = getIcon('lock');
        const clearIcon = getIcon('clear');
        const value = useVModel<string | number>(props);
        const handleKeydown = (event: KeyboardEvent) => isNumber.value && onlyNumber(event);
        autofocusElement(props.autofocus, input);

        return {
            value,
            input,
            handleKeydown,
            isNumber,
            lockIcon,
            clearIcon
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

input:disabled[type=number] {
    -moz-appearance: textfield; /* Firefox */
}

.prefix, .suffix {
    line-height: 1.28;
}
</style>
