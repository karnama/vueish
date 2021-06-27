<template>
    <UIFileUploader :upload="upload" class="text-brand-600" @validation-error="logError" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FileUploader',

    setup: () => {
        const upload = async (files: File[]) => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const names = files.map(file => '- ' + file.name).join('\n');
            // eslint-disable-next-line no-console
            console.info('Uploaded:\n' + names);
        };
        const logError = (payload: any) => {
            // eslint-disable-next-line no-console
            console.error(payload);
        };

        return {
            upload,
            logError
        };
    }
});
</script>

