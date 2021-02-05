<template>
    <UICheckbox v-model="isChecked"
                name="agreement"
                label="I accept the terms and agreement" />

    <div class="mt-4 space-y-2">
        <h3>Checkboxes with array</h3>
        <UICheckbox v-model="values" name="names" value="john">
            John
        </UICheckbox>
        <UICheckbox v-model="values" name="names" value="bruce">
            Bruce
        </UICheckbox>
        <p v-for="name in values" :key="name">
            {{ name }}
        </p>
    </div>
</template>

<script lang="ts">
import UICheckbox from './UICheckbox.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Checkbox',
    components: { UICheckbox },
    setup() {
        const isChecked = ref(true);
        const values = ref<string[]>([]);
        return { isChecked, values };
    }
});
</script>
