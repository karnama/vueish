<template>
    <div class="flex justify-evenly mb-6">
        <UIButton category="danger" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <UIRangeSlider v-model="num"
                   name="slider"
                   :step="0.5"
                   :error="error"
                   min="-100"
                   label="Default range slider"
                   max="100" />

    <UIRangeSlider v-model="num"
                   name="slider"
                   :step="0.5"
                   :error="error"
                   disabled
                   min="-100"
                   class="mt-12"
                   label="Disabled range slider"
                   max="100" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'RangeSlider',

    setup() {
        const num = ref(50);
        const error = ref('');

        return {
            num,
            error
        };
    }
});
</script>
