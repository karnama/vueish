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
import { defineComponent } from 'vue';
import { styleTypes } from 'types';

export default defineComponent({
    name: 'PillDemo',

    setup() {
        return { styleTypes };
    }
});
</script>
