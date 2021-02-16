<template>
    <UIRangeSlider name="slider">
        <template #number="number">
            {{ number }}
        </template>
    </UIRangeSlider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIRangeSlider from './UIRangeSlider.vue';

export default defineComponent({
    name: 'RangeSlider',
    components: { UIRangeSlider }
});
</script>
