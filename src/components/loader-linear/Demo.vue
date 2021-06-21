<template>
    <UILinearLoader inherit-color class="text-red-600" :height="Number(height)" />
    <br>
    <UILinearLoader determinate
                    class="text-gray-700"
                    :steps="Number(steps)"
                    :progress="Number(progress)"
                    :height="Number(height)" />
    <br>
    <div class="space-y-2 text-color">
        <label class="flex">
            steps
            <input v-model="steps"
                   type="range"
                   min="1"
                   max="50">
        </label>
        <label class="flex">
            progress
            <input v-model="progress"
                   type="range"
                   min="1"
                   :max="steps">
        </label>
        <label class="flex">
            height
            <input v-model="height"
                   type="range"
                   min="1"
                   max="30">
        </label>
    </div>
</template>

<script lang="ts">
import UILinearLoader from './UILinearLoader.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'LinearLoader',
    components: { UILinearLoader },
    setup() {
        const steps = ref(10);
        const height = ref(4);
        const progress = ref(5);

        return {
            steps,
            height,
            progress
        };
    }
});
</script>
