<template>
    <UIRangeSlider v-model="num"
                   name="slider"
                   label="Range"
                   :step="0.5"
                   min="-100"
                   max="100" />
    Value: {{ num }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIRangeSlider from './UIRangeSlider.vue';

export default defineComponent({
    name: 'RangeSlider',
    components: { UIRangeSlider },
    setup() {
        const num = ref(50);

        return {
            num
        };
    }
});
</script>
