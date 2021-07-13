<template>
    <div class="h-screen" />
    <UISelect v-model="selected"
              :options="options"
              clearable
              placeholder="Please select..." />

    <UISelect v-model="multiSelected"
              multi
              class="my-12"
              :options="options"
              placeholder="Please select..." />

    <UISelect v-model="multiSelected"
              multi
              clearable
              :options="options"
              placeholder="Please select..." />
    <div class="h-screen" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const options = [
    {
        id: 1,
        name: 'Bruce Banner'
    },
    {
        id: 2,
        name: 'Bruce Wayne'
    },
    {
        id: 3,
        name: 'Bruce Lee'
    },
    {
        id: 4,
        name: 'Brucie Bonus'
    }
];

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Select',

    setup() {
        const selected = ref(null);
        const multiSelected = ref(null);

        return {
            selected,
            multiSelected,
            options
        };
    }
});
</script>
