<template>
    <UIButtonGroup :vertical="vertical" :spread="spread">
        <UIButton v-for="(option, index) in options"
                  :key="option.label"
                  :aria-checked="checked = isEqual(option.value, modelValue)"
                  :type="secondary ? 'default' : 'primary'"
                  :secondary="!checked"
                  :disabled="disabled"
                  class="border"
                  :class="{
                      'border-gray-600 hover:border-gray-400 hover:bg-gray-400 hover:text-gray-900': secondary,
                      'border-blue-600 hover:border-blue-400': !secondary,
                      'text-blue-600 hover:white-text': !checked && !secondary,
                      'white-text bg-gray-600': checked && secondary,
                      'disabled:bg-gray-600': checked && secondary && disabled,
                      'border-l-0': index > 0
                  }"
                  role="switch"
                  @click="model = option.value">
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
    .white-text {
        @apply text-white;
    }
}
</style>
