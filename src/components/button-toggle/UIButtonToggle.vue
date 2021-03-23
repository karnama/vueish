<template>
    <UIButtonGroup :vertical="vertical" :spread="spread">
        <UIButton v-for="(option, index) in options"
                  :key="option.label"
                  :aria-checked="checked = isChecked(option)"
                  :category="secondary ? 'default' : 'primary'"
                  :outline="!checked"
                  :large="large"
                  v-bind="$attrs"
                  :disabled="disabled"
                  class="border"
                  :class="{
                      'border-gray-600': secondary,
                      'hover:border-gray-400 hover:bg-gray-400 hover:text-gray-900': secondary && !disabled,
                      'border-blue-600': !secondary,
                      'hover:border-blue-400': !secondary && !disabled && !checked,
                      'hover:border-blue-700': !secondary && !disabled && checked,
                      'text-blue-600': !checked && !secondary,
                      'hover:white-text': !checked && !secondary && !disabled,
                      'white-text bg-gray-600 disabled:bg-gray-600': checked && secondary,
                      'border-l-0': index > 0
                  }"
                  role="switch"
                  @click="toggleOption(option)"
                  @keydown.space="toggleOption(option)">
            <slot v-if="option.slot" :name="option.slot" :option="option" />
            <template v-else>
                {{ option.label }}
            </template>
        </UIButton>
    </UIButtonGroup>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import type { PropType } from 'vue';
import UIButtonGroup, { props } from '@components/button-group/UIButtonGroup.vue';
import { large } from '@composables/style';
import { useVModel, disabled, clearable } from '@composables/input';
import UIButton from '@components/button/UIButton.vue';
import { isEqual, uniq } from 'lodash-es';
import { MaybeArray } from '@/types';
import { wrap } from '@/helpers';

export type Option = {
    label?: string; // label to use if no slot set
    value: any;
    slot?: string; // name of the slot to use for this option
};

export default defineComponent({
    name: 'UIButtonToggle',

    components: { UIButton, UIButtonGroup },

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [Array, Object, null] as PropType<MaybeArray<Option> | null>
        },

        /**
         * The available options.
         */
        options: {
            type: Array as PropType<Option[]>,
            required: true,
            validator: (opts: Option[]) => uniq(opts.map(option => option.value)).length === opts.length
        },

        /**
         * Use the secondary styles.
         */
        secondary: {
            type: Boolean,
            default: false
        },

        /**
         * Property indicating whether multiple values can be selected or not.
         */
        multi: {
            type: Boolean,
            default: false
        },

        clearable,
        disabled,
        large,
        ...props
    },

    emits: ['update:modelValue'],

    setup(props) {
        const model = useVModel<MaybeArray<Option> | null>(props);

        const toggleOption = (option: Option): void => {
            const values = Array.isArray(model.value)
                ? model.value
                : model.value ? [model.value] : [];

            const optionIndex = values.findIndex(opt => isEqual(opt, option));

            if (props.multi) {
                if (!props.clearable && optionIndex !== -1 && values.length === 1) return;

                optionIndex === -1
                    ? (model.value as Option[]).push(option)
                    : (model.value as Option[]).splice(optionIndex, 1);

                return;
            }

            if (optionIndex === -1) {
                model.value = option;
                return;
            }

            if (!props.clearable) return;

            model.value = null;
        };
        const isChecked = (option: Option): boolean => {
            if (!model.value) {
                return false;
            }

            const values = Array.isArray(model.value) ? model.value : [model.value];

            return values.findIndex(val => isEqual(option.value, val.value)) !== -1;
        };

        watch(
            () => props.multi,
            val => {
                if (val) {
                    model.value = wrap(model.value).filter(v => !!v);
                    return;
                }

                if (Array.isArray(model.value)) {
                    model.value = model.value.length !== 1 ? null : model.value[0];
                }
            },
            { immediate: true }
        );

        return {
            model,
            isChecked,
            toggleOption
        };
    }
});
</script>

<style scoped lang="scss">
@variants hover {
    // specificity hack
    .white-text {
        @apply text-white;
    }
}
</style>
