<template>
    <div v-click-away="() => location = 'outside'"
         class="p-6 bg-brand-600 text-white cursor-pointer shadow rounded select-none"
         @click="location = 'inside'">
        Last clicked {{ location }}
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import clickAway from '@/directives/clickAway/index';

export default defineComponent({
    name: 'ClickAway',
    directives: { clickAway },
    setup: () => {
        const location = ref('no-where');

        return {
            location
        };
    }
});
</script>
