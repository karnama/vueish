<template>
    <UIButtonGroup :vertical="vertical" :spread="spread">
        <UIButton v-for="(option, index) in options"
                  :key="option.label"
                  :aria-checked="checked = isChecked(option)"
                  :category="option.category || category"
                  :outline="!checked"
                  :large="large"
                  v-bind="$attrs"
                  :disabled="disabled"
                  class="border"
                  :class="{
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
import { large, category } from '@composables/style';
import { useVModel, disabled, clearable } from '@composables/input';
import UIButton from '@components/button/UIButton.vue';
import { isEqual, uniq } from 'lodash-es';
import type { MaybeArray, Option } from '@/types';
import { wrap } from '@/helpers';

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
         * Property indicating whether multiple values can be selected or not.
         */
        multi: {
            type: Boolean,
            default: false
        },

        clearable,
        disabled,
        large,
        category,
        ...props
    },

    emits: ['update:modelValue'],

    setup(props) {
        const model = useVModel<MaybeArray<Option> | null>(props);

        const toggleOption = (option: Option): void => {
            const values: Option[] = Array.isArray(model.value)
                ? model.value
                : model.value ? [model.value] : [];

            const optionIndex = values.findIndex(opt => isEqual(opt, option));

            if (props.multi) {
                if (!props.clearable && optionIndex !== -1 && values.length === 1) return;

                model.value = optionIndex === -1
                    ? [...(model.value as Option[]), option]
                    : (model.value as Option[]).filter((option, index) => index !== optionIndex);
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
                    model.value = wrap(model.value).filter(v => !!v) as Option[];
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

