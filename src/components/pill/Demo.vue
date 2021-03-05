<template>
    <div class="flex justify-evenly flex-wrap">
        <UIPill v-for="type in styleTypes"
                :key="type"
                :type="type"
                class="m-2">
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
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
