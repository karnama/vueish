<template>
    <UICheckbox v-model="secondary"
                label="Secondary"
                name="secondary"
                class="mb-6" />
    <UICheckbox v-model="disabled"
                label="Disabled"
                name="disabled"
                class="mb-6" />

    <p>Prop options</p>
    <UIButtonToggle v-model="selected"
                    :options="options"
                    :secondary="secondary"
                    :disabled="disabled" />

    <p class="mt-4">
        Slotted option
    </p>
    <UIButtonToggle v-model="selected"
                    :options="slottedOptions"
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
import UIButtonToggle from '@components/button-toggle/UIButtonToggle.vue';
import { Option } from '@components/button-toggle/UIButtonToggleTypes';
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
        const selected = ref('');
        const secondary = ref(false);
        const disabled = ref(false);

        return {
            options,
            slottedOptions,
            selected,
            secondary,
            disabled
        };
    }
});
</script>
