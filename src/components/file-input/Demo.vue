<template>
    <div class="flex justify-evenly mb-6">
        <UICheckbox v-model="large"
                    name="large"
                    label="Large Style" />
        <UICheckbox v-model="small"
                    name="small"
                    label="Small Style" />
        <UICheckbox v-model="loading"
                    name="loading"
                    label="Loading" />

        <UIButton theme="red" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <div class="space-y-10">
        <UIFileInput v-model="file"
                     :large="large"
                     :small="small"
                     :error="error"
                     :loading="loading"
                     placeholder="File input"
                     clearable
                     name="file-input"
                     label="Default file input" />

        <UIFileInput v-model="file"
                     name="file-input"
                     :large="large"
                     :small="small"
                     :error="error"
                     :loading="loading"
                     disabled
                     label="Disabled file input" />

        <UIFileInput v-model="file2"
                     name="file-input"
                     :large="large"
                     :small="small"
                     :error="error"
                     :loading="loading"
                     multiple
                     clearable
                     label="Multiple file input" />

        <UIFileInput v-model="file2"
                     name="file-input"
                     :large="large"
                     :small="small"
                     :error="error"
                     :loading="loading"
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
        const loading = ref(false);
        const small = ref(false);

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
            error,
            loading,
            small
        };
    }
});
</script>
