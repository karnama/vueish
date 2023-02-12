<template>
    <div class="space-y-6">
        <div class="flex justify-evenly">
            <UIButton theme="red" @click="error ? error = '' : error = 'Error message.'">
                {{ error ? 'Remove' : 'Set' }} Error state
            </UIButton>
        </div>

        <div class="grid grid-cols-2 grid-rows-2 gap-2" style="height: calc(100vh - 200px)">
            <UIFileUploader :error="error"
                            :upload="upload"
                            class="col-span-1"
                            @validation-error="logError" />
            <div />
            <UIFileUploader :error="error"
                            :upload="upload"
                            class="col-span-2"
                            @validation-error="logError">
                <template #default="{ uploadIcon }">
                    <p class="text-pink-600" v-html="uploadIcon" />
                    <p class="text-lg">
                        <small class="text-color-muted">Customised with slots</small>
                        <br>
                        Drop files here to upload them
                    </p>
                    <UIButton theme="pink" class="mt-2">
                        Browse
                    </UIButton>
                </template>
                <template #files="slotProps">
                    <template v-if="slotProps.files.length <= 0">
                        <UIFile v-for="(file, index) in slotProps.files"
                                :key="index"
                                :file="file"
                                class="py-2"
                                :upload="upload"
                                @removed="slotProps.removeFile" />
                    </template>
                    <UIRadioGroup v-else name="defaultUpload">
                        <div v-for="(file, index) in slotProps.files"
                             :key="index"
                             class="flex items-center justify-between">
                            <UIRadio :value="file.name" />
                            <UIFile :file="file"
                                    class="py-2"
                                    :upload="upload"
                                    @removed="slotProps.removeFile" />
                        </div>
                    </UIRadioGroup>
                </template>
            </UIFileUploader>
        </div>
    </div>
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

