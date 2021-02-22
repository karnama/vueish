<template>
    <UIRangeSlider v-model="num"
                   name="slider"
                   label="Range"
                   :step="0.5"
                   min="-130"
                   max="-10" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIRangeSlider from './UIRangeSlider.vue';

export default defineComponent({
    name: 'RangeSlider',
    components: { UIRangeSlider },
    setup() {
        const num = ref(-55);

        return {
            num
        };
    }
});
</script>
