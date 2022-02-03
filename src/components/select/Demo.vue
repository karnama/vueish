<template>
    <div class="flex justify-evenly mb-6">
        <UICheckbox v-model="large"
                    name="large"
                    label="Large Style" />

        <UIButton category="danger" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>
    <UISelect v-model="selected"
              :options="options"
              clearable
              :error="error"
              :large="large"
              label="Clearable select"
              name="select-1" />

    <UISelect v-model="multiSelected"
              multi
              class="my-12"
              :options="options"
              :error="error"
              disabled
              :large="large"
              label="Disabled multi select"
              name="select-2" />

    <UISelect v-model="multiSelected"
              multi
              class="my-12"
              :options="options"
              label="Multi select"
              :error="error"
              :large="large"
              name="select-2" />

    <UISelect v-model="multiSelected"
              multi
              clearable
              label="Clearable multi select"
              name="select-3"
              :error="error"
              :large="large"
              :options="options" />
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
    name: 'SelectDemo',

    setup() {
        const selected = ref(null);
        const multiSelected = ref(null);
        const large = ref(false);
        const error = ref('');

        return {
            selected,
            multiSelected,
            options,
            large,
            error
        };
    }
});
</script>
