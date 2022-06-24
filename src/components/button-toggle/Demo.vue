<template>
    <UICheckbox v-model="disabled"
                label="Disabled"
                name="disabled"
                class="mb-6" />
    <UICheckbox v-model="large"
                label="Large"
                name="large"
                class="mb-6" />
    <UICheckbox v-model="multi"
                label="Multi select"
                name="multi"
                class="mb-6" />
    <UICheckbox v-model="clearable"
                label="Clearable"
                name="multi"
                class="mb-6" />

    <p class="text-color">
        Prop options
    </p>
    <UIButtonToggle v-model="selected"
                    :options="options"
                    :large="large"
                    :multi="multi"
                    theme="blue"
                    :clearable="clearable"
                    :disabled="disabled" />

    <p class="mt-4 text-color">
        Slotted option
    </p>
    <UIButtonToggle v-model="selectedSlotted"
                    :options="slottedOptions"
                    :large="large"
                    :multi="multi"
                    theme="blue"
                    :clearable="clearable"
                    :disabled="disabled">
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
import type { Option } from 'types';

export default defineComponent({
    name: 'ButtonToggle',

    setup() {
        const options: Option[] = [
            { label: 'Places', value: 'places', theme: 'brand' },
            { label: 'List', value: 'list' },
            { label: 'Map', value: 'map' }
        ];

        const slottedOptions: Option[] = [
            { label: 'Places', value: 'places', slot: 'places' },
            { label: 'List', value: 'list', slot: 'list' },
            { label: 'Map', value: 'map', slot: 'map' }
        ];
        const selected = ref(null);
        const selectedSlotted = ref(null);
        const disabled = ref(false);
        const large = ref(false);
        const multi = ref(false);
        const clearable = ref(false);

        return {
            options,
            slottedOptions,
            selectedSlotted,
            selected,
            disabled,
            large,
            multi,
            clearable
        };
    }
});
</script>
