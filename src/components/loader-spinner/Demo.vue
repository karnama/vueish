<template>
    <UISpinnerLoader class="mx-auto"
                     :diameter="85"
                     :progress="Number(progress)"
                     :determinate="determinate">
        <span v-if="determinate" class="text-sm text-black">{{ progress }} %</span>
    </UISpinnerLoader>
    <UICheckbox v-model="determinate" name="determinate" label="Determinate" />
    <div v-show="determinate" class="w-full flex flex-row flex-wrap justify-between items-center content-center">
        <label class="w-2/12" for="progress">0</label>
        <input id="progress"
               v-model="progress"
               class="w-7/12"
               type="range"
               min="0"
               max="100">
        <label class="w-2/12 text-right" for="progress">100</label>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UISpinnerLoader from './UISpinnerLoader.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';

export default defineComponent({
    name: 'SpinnerLoader',

    components: {
        UICheckbox,
        UISpinnerLoader
    },

    setup() {
        const determinate = ref(false);
        const progress = ref(0);

        return {
            determinate,
            progress
        };
    }
});
</script>
