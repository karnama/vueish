<template>
    <div class="flex justify-evenly mb-6">
        <UICheckbox v-model="large"
                    name="large"
                    label="Large Style" />

        <UIButton category="danger" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <div class="space-y-10">
        <UIFileInput v-model="file"
                     :large="large"
                     :error="error"
                     clearable
                     name="file-input"
                     :label="label" />

        <UIInput v-model="label" name="label" />
        <UIFileInput v-model="file"
                     name="file-input"
                     :large="large"
                     :error="error"
                     disabled
                     label="Disabled file input" />

        <UIFileInput v-model="file2"
                     name="file-input"
                     :large="large"
                     :error="error"
                     multiple
                     clearable
                     label="Multiple file input" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'FileInput',

    setup: () => {
        const generatedFile = new File(['content'], 'my-document.pdf');
        const file = ref(generatedFile);
        const file2 = ref<File[]>([generatedFile]);
        const large = ref(false);
        const error = ref('');
        const label = ref('');

        return {
            file,
            file2,
            large,
            error,
            label
        };
    }
});
</script>
