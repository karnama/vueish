<template>
    <UIButtonGroup :vertical="vertical" :spread="spread">
        <UIButton v-for="(option, index) in options"
                  :key="option.label"
                  :aria-checked="checked = isEqual(option.value, modelValue)"
                  :category="secondary ? 'default' : 'primary'"
                  :outline="!checked"
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
                  @click="model = option.value"
                  @keydown.space="model = option.value">
            <slot v-if="option.slot" :name="option.slot" :option="option" />
            <template v-else>
                {{ option.label }}
            </template>
        </UIButton>
    </UIButtonGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import UIButtonGroup, { props } from '@components/button-group/UIButtonGroup.vue';
import { useVModel, modelValue, disabled } from '@composables/input';
import { Option } from '@components/button-toggle/UIButtonToggleTypes';
import UIButton from '@components/button/UIButton.vue';
import { isEqual } from 'lodash-es';

export default defineComponent({
    name: 'UIButtonToggle',
    components: { UIButton, UIButtonGroup },

    props: {
        options: {
            type: Array as PropType<Option[]>,
            required: true
        },

        secondary: {
            type: Boolean,
            default: false
        },

        disabled,
        modelValue,
        ...props
    },

    setup(props) {
        const model = useVModel(props);

        return {
            model,
            isEqual
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
