<template>
    <div class="flex justify-evenly mb-6">
        <UICheckbox v-model="sm"
                    name="sm"
                    label="Small Style" />
    </div>

    <h2>Primary</h2>
    <div class="flex justify-evenly flex-wrap">
        <UILabel v-for="category in styleTypes"
                 :key="category"
                 :category="category"
                 :sm="sm"
                 class="m-2">
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </UILabel>
    </div>
    <h2>Secondary</h2>
    <div class="flex justify-evenly flex-wrap">
        <UILabel v-for="category in styleTypes"
                 :key="category"
                 secondary
                 rounded
                 :sm="sm"
                 :category="category"
                 class="m-2">
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </UILabel>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { styleTypes } from 'types';

export default defineComponent({
    name: 'LabelDemo',

    setup: () => ({ styleTypes, sm: ref(false) })
});
</script>
