<template>
    <UICheckbox v-model="isChecked"
                name="agreement"
                label="I accept the terms and agreement" />

    <div class="mt-4 space-y-2">
        <h3>Checkboxes with array</h3>
        <UICheckbox v-model="values" name="name1" value="john">
            John
        </UICheckbox>
        <UICheckbox v-model="values" name="name2" value="bruce">
            Bruce
        </UICheckbox>
        <p>
            modelValue:
            {{ names }}
        </p>
    </div>

    <UICheckbox v-model="isChecked"
                name="indeterminate-cbx"
                indeterminate
                label="Indeterminate state" />
</template>

<script lang="ts">
import UICheckbox from './UICheckbox.vue';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Checkbox',
    components: { UICheckbox },
    setup() {
        const isChecked = ref(true);
        const values = ref<string[]>([]);
        const names = computed(() => values.value.length ? '["' + values.value.join('", "') + '"]' : '[]');
        return {
            isChecked,
            values,
            names
        };
    }
});
</script>
