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
                     label="Default file input" />

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

        <UIFileInput v-model="file2"
                     name="file-input"
                     :large="large"
                     :error="error"
                     :display-name-func="displayName"
                     button-text="Select attachments or drop here"
                     multiple
                     clearable
                     label="Custom labelled input" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { MaybeArray } from '../../../types/utilities';

export default defineComponent({
    name: 'FileInput',

    setup: () => {
        const generatedFile = new File(['content'], 'my-document.pdf');
        const file = ref(generatedFile);
        const file2 = ref<File[]>([generatedFile]);
        const large = ref(false);
        const error = ref('');

        const displayName = (files: MaybeArray<File> | null) => {
            if (!files) return '';

            return Array.isArray(files) && files.length > 1
                ? String(files.length) + ' files selected'
                : '1 file selected';
        };

        return {
            file,
            file2,
            displayName,
            large,
            error
        };
    }
});
</script>
