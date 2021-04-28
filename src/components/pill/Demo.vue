<template>
    <div class="flex justify-evenly flex-wrap">
        <UIPill v-for="category in styleTypes"
                :key="category"
                :category="category"
                class="m-2">
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </UIPill>
    </div>
</template>

<script lang="ts">
import UIPill from './UIPill.vue';
import { defineComponent } from 'vue';
import { styleTypes } from '@/types';

export default defineComponent({
    name: 'Pill',
    components: { UIPill },
    setup() {
        return { styleTypes };
    }
});
</script>
