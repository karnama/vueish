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

        <UIFileInput v-model="file3"
                     name="file-input"
                     :large="large"
                     :error="error"
                     :showFilesCount="true"
                     :light="true"
                     multiple
                     clearable
                     label="Multiple file input with custom label" >
            <template v-slot:button-text>
                Select attachments or drop here
            </template>
        </UIFileInput>
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
        const file3 = ref<File[]>([generatedFile]);
        const large = ref(false);
        const error = ref('');

        return {
            file,
            file2,
            file3,
            large,
            error
        };
    }
});
</script>
