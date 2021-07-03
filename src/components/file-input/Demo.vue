<template>
    <UICheckbox v-model="large"
                name="large"
                label="Large Style"
                class="mb-6" />

    <div class="space-y-10">
        <UIFileInput v-model="file"
                     :large="large"
                     clearable
                     name="file-input"
                     label="Default file input" />

        <UIFileInput v-model="file"
                     name="file-input"
                     :large="large"
                     disabled
                     label="Disabled file input" />

        <UIFileInput v-model="file2"
                     name="file-input"
                     :large="large"
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

        return {
            file,
            file2,
            large
        };
    }
});
</script>
