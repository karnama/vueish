<template>
    <div class="flex justify-evenly flex-wrap">
        <UILabel v-for="category in styleTypes"
                 :key="category"
                 :category="category"
                 class="m-2">
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </UILabel>
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
