<template>
    <div class="ui-file-input" :class="$attrs.class">
        <label :for="$attrs.id ?? name" class="font-medium text-color flex items-center">
            {{ label }}
        </label>

        <div ref="input"
             class="rounded flex justify-between flex-nowrap items-center shadow-sm px-3.5 focus:outline-none
                    transition-colors border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 border"
             :title="displayName.replaceAll('<br>', '\n')"
             :class="{
                 'px-7': large,
                 'bg-gray-200 dark:!bg-gray-700 cursor-not-allowed': disabled,
                 'cursor-pointer focus-within:border-blue-400 dark:focus-within:border-blue-500': !disabled
             }"
             :tabindex="disabled ? -1 : 0"
             :style="$attrs.style"
             @click="disabled ? undefined : $refs.fileInput.click()"
             @keydown.enter="$refs.fileInput.click()"
             @dragover.prevent="isDraggedOver = true"
             @dragleave="isDraggedOver = false"
             @drop.prevent="addFiles">
            <input ref="fileInput"
                   type="file"
                   hidden
                   :multiple="multiple"
                   :accept="acceptedMimes"
                   v-bind="omit($attrs, ['class', 'style'])"
                   @change="addFiles">
            <div class="flex items-center flex-wrap justify-between w-full">
                <UIButton category="primary"
                          :class="[ large ? 'my-4' : 'my-2']"
                          :disabled="disabled">
                    Choose file
                </UIButton>

                <template v-if="displayName">
                    <div class="truncate text-color py-2 px-4 flex-1 select-none"
                         :class="[ large ? 'ml-4' : 'ml-2' ]"
                         v-html="displayName" />

                    <UIFadeTransition duration-out="duration-100" duration-in="duration-100">
                        <span v-if="disabled"
                              class="h-5 w-5 mx-auto text-color-muted flex-shrink-0"
                              v-html="lockIcon" />

                        <button v-else-if="clearable && displayName"
                                class="clear-icon h-5 w-5 cursor-pointer mx-auto text-color-muted flex-shrink-0"
                                :aria-controls="$attrs.id ?? name"
                                aria-roledescription="clear"
                                @click.stop="$emit('update:modelValue', null)"
                                v-html="clearIcon" />
                    </UIFadeTransition>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// todo: the below
//  [ ] - menu open style break
//  [ ] - picture display
import { computed, defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { createFileList, getSizeString } from '@composables/utils';
import { name, label, clearable, autofocus, disabled, positiveOptionalNumber } from '@composables/input';
import { large } from '@composables/style';
import { omit } from 'lodash-es';
import { getIcon } from '@/helpers';
import UIFadeTransition from '@components/transitions/UIFadeTransition.vue';
import { FileError } from '@/types';

export default defineComponent({
    name: 'UIFileInput',

    components: { UIFadeTransition },

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [File, Array, null] as PropType<File | File[] | null>
        },

        /**
         * Whether multiple files are accepted.
         */
        multiple: {
            type: Boolean,
            default: false
        },


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
         * The maximum size allowed for a single file in bytes.
         */
        maxSize: positiveOptionalNumber,

        /**
         * The maximum number of files allowed if accepting multiple files.
         */
        maxFiles: positiveOptionalNumber,

        name,
        label,
        clearable,
        autofocus,
        disabled,
        large
    },

    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        'update:modelValue': (_payload: File | File[] | null) => true,
        validationError: (_payload: FileError) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },

    setup: (props, ctx) => {
        const isDraggedOver = ref(false);
        const fileInput = ref<HTMLInputElement>();
        const input = ref<HTMLDivElement>();

        const clearIcon = getIcon('clear');
        const lockIcon = getIcon('lock');

        const displayName = computed(() => {
            if (!props.modelValue) {
                return '';
            }

            return (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue])
                .map(file => file.name + ' - ' + size(file)).join('<br>');
        });

        const size = (file: File) => file ? getSizeString(file) : '';
        const addFiles = (event: DragEvent | InputEvent) => {
            isDraggedOver.value = false;

            const fileList: FileList = event instanceof DragEvent
                ? event.dataTransfer!.files
                : (event.target as HTMLInputElement).files!;

            let files = Array.from(fileList);

            if (files.length !== 1 && !props.multiple) {
                ctx.emit('validationError',
                    {
                        message: 'Only a single file is allowed.',
                        files
                    } as FileError
                );

                return;
            }

            if (props.maxSize) {
                const tooBigFiles = files.filter(file => file.size > props.maxSize);

                ctx.emit('validationError',
                    {
                        message: 'Only a single file is allowed.',
                        files: tooBigFiles
                    } as FileError
                );

                files = files.filter(file => file.size <= props.maxSize);
            }

            if (props.multiple && props.maxFiles && files.length > props.maxFiles) {
                ctx.emit('update:modelValue', files.splice(0, props.maxFiles));

                ctx.emit('validationError',
                    {
                        message: 'Only a single file is allowed.',
                        files: files
                    } as FileError
                );

                return;
            }

            ctx.emit('update:modelValue', props.multiple ? files : files[0]);
        };

        watch(() => props.modelValue, newValue => {
            fileInput.value!.files = newValue ? createFileList(newValue) : null;
        });

        return {
            addFiles,
            isDraggedOver,
            fileInput,
            displayName,
            input,
            omit,
            clearIcon,
            lockIcon
        };
    }
});
</script>

<style lang="scss">
.ui-file-input.active {
    background: rgba(0, 0, 0, .1);

    & .file-list {
        pointer-events: none;
    }
}

.ui-file-input:not(.active) {
    @apply border-gray-300;
}
</style>
