<template>
    <UISpinnerLoader class="mx-auto"
                     :diameter="diameter"
                     :stroke="stroke"
                     :steps="steps"
                     :progress="Number(progress)"
                     :determinate="determinate">
        <span v-if="determinate" class="text-sm text-black">{{ progress + '/' + steps }}</span>
    </UISpinnerLoader>
    <UICheckbox v-model="determinate" name="determinate" label="Determinate" />
    <template v-if="determinate">
        <UIRangeSlider v-model="progress"
                       min="0"
                       :max="steps"
                       name="progress"
                       label="Progress" />
        <UIRangeSlider v-model="steps"
                       min="2"
                       name="steps"
                       label="Steps" />
        <UIRangeSlider v-model="diameter"
                       min="5"
                       name="diameter"
                       label="Diameter" />
        <UIRangeSlider v-model="stroke"
                       min="1"
                       max="20"
                       name="stroke"
                       label="Stroke width" />
    </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UISpinnerLoader from './UISpinnerLoader.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';
import UIRangeSlider from '@components/range-slider/UIRangeSlider.vue';

export default defineComponent({
    name: 'SpinnerLoader',

    components: {
        UIRangeSlider,
        UICheckbox,
        UISpinnerLoader
    },

    setup() {
        const determinate = ref(false);
        const progress = ref(5);
        const steps = ref(10);
        const stroke = ref(6);
        const diameter = ref(85);

        return {
            determinate,
            progress,
            steps,
            stroke,
            diameter
        };
    }
});
</script>
