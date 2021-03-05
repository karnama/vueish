<template>
    <UIButtonGroup :vertical="vertical" :spread="spread">
        <UIButton v-for="option in options"
                  :key="option.label"
                  :type="isEqual(option.value, modelValue) ? option.type ?? 'primary' : 'default'"
                  :aria-checked="isEqual(option.value, modelValue)"
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
import { useVModel, modelValue } from '@composables/input';
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

</style>
