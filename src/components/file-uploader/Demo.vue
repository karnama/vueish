<template>
    <UIFileUploader endpoint="something"
                    :upload="upload"
                    :remove="remove"
                    @validation-error="logError" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIFileUploader from './UIFileUploader.vue';

export default defineComponent({
    name: 'FileUploader',
    components: { UIFileUploader },

    setup: () => {
        const upload = async (files: File | File[]) => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const names = (Array.isArray(files) ? files : [files]).map(file => '- ' + file.name).join('\n');
            console.info('Uploaded:\n' + names);
        };
        const remove = async (file: File) => {
            await new Promise(resolve => setTimeout(resolve, 200));
            console.info('Removed: ' + file.name);
        };
        const logError = (payload: any) => {
            console.error(payload);
        };

        return {
            upload,
            remove,
            logError
        };
    }
});
</script>

