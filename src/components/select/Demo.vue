<template>
    <UISelect v-model="selected"
              :options="options"
              placeholder="Please select..."
              class="mb-12" />
    <UISelect v-model="multiSelected"
              multi
              :options="options"
              placeholder="Please select..." />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UISelect from '@components/select/UISelect.vue';

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
    components: { UISelect },
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
