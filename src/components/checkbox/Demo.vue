<template>
    <div class="flex justify-evenly mb-6">
        <UIButton theme="red" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <UICheckbox v-model="isChecked"
                name="agreement"
                :error="error"
                label="I accept the terms and agreement" />

    <div class="mt-4 space-y-2">
        <h3 class="text-color">
            Checkboxes with array
        </h3>
        <UICheckbox v-model="values"
                    name="name1"
                    value="john"
                    :error="error">
            John
        </UICheckbox>
        <UICheckbox v-model="values"
                    name="name2"
                    value="bruce"
                    :error="error">
            Bruce
        </UICheckbox>
        <p class="text-color">
            modelValue:
            {{ names }}
        </p>
    </div>

    <UICheckbox v-model="isChecked"
                name="indeterminate-cbx"
                :error="error"
                indeterminate
                label="Indeterminate state" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CheckboxDemo',

    setup() {
        const isChecked = ref(true);
        const values = ref<string[]>([]);
        const error = ref('');
        const names = computed(() => values.value.length ? '["' + values.value.join('", "') + '"]' : '[]');

        return {
            isChecked,
            values,
            names,
            error
        };
    }
});
</script>
