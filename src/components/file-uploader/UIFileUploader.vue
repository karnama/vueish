<template>
    <div :class="{ 'active': isDraggedOver && !isLoading, 'pointer-events-none': isLoading }"
         aria-label="File Upload"
         class="rounded-lg drop-zone border-2 transition-colors flex flex-wrap items-stretch
                dark:text-white relative"
         tabindex="0"
         @dragover.prevent="isDraggedOver = true"
         @keydown.enter="openFileBrowser"
         @dragleave="isDraggedOver = false"
         @drop.prevent="addFiles">
        <input ref="fileInput"
               type="file"
               hidden
               multiple
               :accept="acceptedMimes.join(',')"
               @change.prevent="addFiles">

        <div class="flex-grow flex flex-col items-center justify-center py-24 px-2 text-center cursor-pointer"
             @click="openFileBrowser">
            <p class="mb-4 text-brand-600" v-html="uploadIcon" />
            <p class="text-lg">
                Drag and Drop file
            </p>
            or
            <UIButton category="brand" class="mt-2">
                Browse
            </UIButton>
        </div>
        <div v-show="files.length"
             class="w-full sm:w-1/2 flex flex-col py-6 px-2
                    justify-between bg-gray-200 dark:bg-gray-600 items-center"
             @keydown.enter.stop>
            <div class="overflow-y-scroll max-h-64 pl-6 mr-2 pr-4 file-list space-y-2 w-full">
                <UIFile v-for="(file, index) in files"
                        :key="index"
                        :file="file"
                        :upload="upload"
                        :upload-on-mounted="uploadAsap"
                        @removed="removeFile" />
            </div>
            <UIButton v-if="!uploadAsap"
                      category="brand"
                      :loading="isLoading"
                      class="mt-4"
                      tabindex="0"
                      @click="uploadFiles">
                Upload
            </UIButton>
        </div>

        <UIFadeTransition>
            <div v-if="isLoading" class="absolute top-0 bottom-0 right-0 left-0 bg-gray-400 bg-opacity-50" />
        </UIFadeTransition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';
import UIFile from './UIFile.vue';
import { getIcon } from '@/helpers';
import UIButton from '@components/button/UIButton.vue';
import { FileError } from '@/types';
import UIFadeTransition from '@components/transitions/UIFadeTransition.vue';

export default defineComponent({
    name: 'UIFileUploader',

    components: { UIFadeTransition, UIFile, UIButton },

    props: {
        /**
         * Accepted mimes in an array format.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
         */
        acceptedMimes: {
            type: Array as PropType<string[]>,
            default: () => ['*']
        },

        /**
         * Maximum number of files to allow to be selected.
         */
        maxFiles: {
            type: Number
        },

        /**
         * The maximum size allowed for a single file.
         */
        maxSize: {
            type: Number
        },

        /**
         * Upload as soon as the file(s)' selected.
         */
        uploadAsap: {
            type: Boolean,
            default: false
        },

        /**
         * The function that uploads the files.
         */
        upload: {
            type: Function as PropType<(files: File[]) => Promise<void>>,
            required: true
        }
    },

    emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validationError: (_payload: FileError) => true
    },

    setup: (props, ctx) => {
        const uploadIcon = getIcon('upload');

        const fileInput = ref<HTMLInputElement>();
        const isDraggedOver = ref(false);
        const files = ref<File[]>([]);
        const isLoading = ref(false);

        const findFileIndex = (file: File) => {
            return files.value.findIndex(iFile => file.size === iFile.size && file.name === iFile.name);
        };
        const addFiles = (event: DragEvent | InputEvent) => {
            if (isLoading.value) return;

            isDraggedOver.value = false;
            const fileList: FileList = event instanceof DragEvent
                ? event.dataTransfer!.files
                : (event.target as HTMLInputElement).files!;
            // filter out duplicates
            let filteredList: File[] = Array.from(fileList).filter(file => findFileIndex(file) === -1);

            if (fileList.length !== filteredList.length) {
                ctx.emit('validationError',
                    {
                        message: 'Duplicate files not allowed.',
                        files: Array.from(fileList).filter(file => findFileIndex(file) !== -1)
                    } as FileError
                );
            }

            if (typeof props.maxSize === 'number') {
                const tooBigFiles = filteredList.filter(file => file.size > props.maxSize!);

                if (filteredList.length && tooBigFiles.length) {
                    ctx.emit('validationError', {
                        message: 'File size exceeds the specified allowed size',
                        files: tooBigFiles
                    } as FileError);

                    filteredList = filteredList.filter(file => file.size <= props.maxSize!);
                }
            }

            if (typeof props.maxFiles === 'number') {
                const remainingSpace = props.maxFiles - files.value.length;
                const allowedItems = filteredList.splice(0, remainingSpace);
                files.value.push(...allowedItems);

                if (filteredList.length) {
                    ctx.emit('validationError', {
                        message: 'Files exceeded specified max count.',
                        files: filteredList
                    } as FileError);
                }
                return;
            }

            files.value.push(...filteredList);
        };
        const removeFile = (file: File) => {
            files.value.splice(findFileIndex(file), 1);
        };
        const openFileBrowser = () => {
            if (isLoading.value) return;

            if (typeof props.maxFiles === 'number' && files.value.length === props.maxFiles) {
                ctx.emit('validationError', {
                    message: 'Maximum number of files already been added.',
                    files: []
                } as FileError);
                return;
            }

            fileInput.value!.click();
        };
        const uploadFiles = async () => {
            isLoading.value = true;
            await props.upload(files.value)
                .then(resp => {
                    files.value = [];
                    return resp;
                })
                .finally(() => {
                    isLoading.value = false;
                });
        };

        return {
            fileInput,
            isDraggedOver,
            files,
            uploadIcon,
            isLoading,
            addFiles,
            removeFile,
            openFileBrowser,
            uploadFiles
        };
    }
});
</script>

<style lang="scss" scoped>
.drop-zone.active {
    background: rgba(0, 0, 0, .1);

    & .file-list {
        pointer-events: none;
    }
}

.drop-zone:not(.active) {
    @apply border-gray-300;
}

.drop-zone {
    overflow: clip;
    border-style: dashed;
}
</style>