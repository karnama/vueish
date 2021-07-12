<template>
    <div class="flex justify-evenly mb-6">
        <UIButton category="danger" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <UIFileUploader :error="error"
                    :upload="upload"
                    class="border-brand-400"
                    @validation-error="logError" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'FileUploader',

    setup: () => {
        const error = ref('');

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
            error,
            upload,
            logError
        };
    }
});
</script>

