<template>
    <UIRangeSlider v-model="num"
                   name="slider"
                   :step="0.5"
                   min="-100"
                   max="100">
        <template #label="slotProps">
            Range ({{ slotProps.value }})
        </template>
    </UIRangeSlider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'RangeSlider',

    setup() {
        const num = ref(50);

        return {
            num
        };
    }
});
</script>
