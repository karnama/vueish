<template>
    <UICheckbox v-model="secondary"
                label="Secondary"
                name="secondary"
                class="mb-6" />
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

    <p>Prop options</p>
    <UIButtonToggle v-model="selected"
                    :options="options"
                    :large="large"
                    :multi="multi"
                    :clearable="clearable"
                    :secondary="secondary"
                    :disabled="disabled" />

    <p class="mt-4">
        Slotted option
    </p>
    <UIButtonToggle v-model="selected"
                    :options="slottedOptions"
                    :large="large"
                    :multi="multi"
                    :secondary="secondary"
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
import UIButtonToggle from './UIButtonToggle.vue';
import type { Option } from './UIButtonToggle.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';

export default defineComponent({
    name: 'ButtonToggle',
    components: { UICheckbox, UIButtonToggle },

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
        const selected = ref(null);
        const secondary = ref(false);
        const disabled = ref(false);
        const large = ref(false);
        const multi = ref(false);
        const clearable = ref(false);

        return {
            options,
            slottedOptions,
            selected,
            secondary,
            disabled,
            large,
            multi,
            clearable
        };
    }
});
</script>
