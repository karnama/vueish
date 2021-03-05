<template>
    <p>Prop options</p>
    <UIButtonToggle v-model="selected" :options="options" />

    <p class="mt-4">
        Slotted option
    </p>
    <UIButtonToggle v-model="selected" :options="slottedOptions">
        <template #places="slotProps">
            slotted {{ slotProps.option.label }}
        </template>
        <template #list="slotProps">
            slotted {{ slotProps.option.label }}
        </template>
        <template #map="slotProps">
            slotted {{ slotProps.option.label }}
        </template>
    </UIButtonToggle>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIButtonToggle from '@components/button-toggle/UIButtonToggle.vue';
import { Option } from '@components/button-toggle/UIButtonToggleTypes';

export default defineComponent({
    name: 'ButtonToggle',
    components: { UIButtonToggle },

    setup() {
        const options: Option[] = [
            { label: 'Places', value: 'places' },
            { label: 'List', value: 'list' },
            { label: 'Map', value: 'map' }
        ];

        const slottedOptions: Option[] = [
            { label: 'Places', value: 'places', slot: 'places' },
            { label: 'List', value: 'list', slot: 'list' },
            { label: 'Map', value: 'map', slot: 'map' }
        ];
        const selected = ref('');

        return {
            options,
            slottedOptions,
            selected
        };
    }
});
</script>
