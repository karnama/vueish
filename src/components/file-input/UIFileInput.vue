<template>
    <div class="ui-file-input" :class="$attrs.class">
        <label :for="$attrs.id ?? name"
               class="font-medium text-color flex items-center"
               :class="{ 'text-color-error': error || $slots.error }">
            {{ label }}
        </label>

        <div ref="input"
             class="rounded flex justify-between items-center shadow-sm focus:outline-none
                    transition-colors border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 border"
             :title="displayList"
             :class="{
                 'bg-gray-200 dark:!bg-gray-700 cursor-not-allowed': disabled,
                 'cursor-pointer': !disabled,
                 'focus-within:border-blue-400 dark:focus-within:border-blue-500':!(error || $slots.error) && !disabled,
                 'border-red-700 dark:!border-red-500': error || $slots.error
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
            <div class="flex items-center flex-wrap w-full" :class="{ 'justify-center' : displayName }">
                <button title="Choose a file"
                        :disabled="disabled"
                        class="focus:outline-none font-bold m-0 text-sm border-none
                               transition-all rounded-l text-color disabled:cursor-not-allowed
                               bg-gray-200 dark:bg-gray-700 ring-gray-400 dark:ring-gray-500"
                        :style="{
                            'filter': disabled ? 'invert(5%)': 'invert(0%)'
                        }"
                        :class="{
                            'text-color-muted': disabled,
                            'hover:bg-gray-300 dark:hover:bg-gray-800 focus:ring-1': !disabled,
                            'py-[1.3125rem] px-6': large,
                            'px-4 py-[0.938rem]': !large
                        }">
                    Choose file
                </button>

                <template v-if="displayName">
                    <div class="truncate text-color py-2 px-4 flex-1 select-none break-words value-text"
                         :class="[ large ? 'ml-4' : 'ml-2' ]"
                         v-html="displayName" />

                    <UIFadeTransition duration-out="duration-100" duration-in="duration-100">
                        <span v-if="disabled"
                              class="h-5 w-5 mr-2 mx-auto text-color-muted flex-shrink-0"
                              v-html="lockIcon" />

                        <button v-else-if="clearable && displayName"
                                class="clear-icon h-5 w-5 mr-2 cursor-pointer mx-auto text-color-muted flex-shrink-0"
                                :aria-controls="$attrs.id ?? name"
                                aria-roledescription="clear"
                                @click.stop="$emit('update:modelValue', null)"
                                v-html="clearIcon" />
                    </UIFadeTransition>
                </template>
            </div>
        </div>

        <UIExpandTransition>
            <slot v-if="error || $slots.error" name="error">
                <p class="text-color-error text-sm">
                    {{ error }}
                </p>
            </slot>
        </UIExpandTransition>
    </div>
</template>

<script lang="ts">

import { computed, defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { createFileList, getSizeString } from '@composables/utils';
import { name, label, clearable, autofocus, disabled, positiveOptionalNumber, error } from '@composables/input';
import { large } from '@composables/style';
import { omit } from 'lodash-es';
import { getIcon } from '@/helpers';
import UIFadeTransition from '@components/transitions/UIFadeTransition.vue';
import UIExpandTransition from '@components/transitions/UIExpandTransition.vue';
import { FileError } from '@/types';

export default defineComponent({
    name: 'UIFileInput',

    components: { UIFadeTransition, UIExpandTransition },

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
        large,
        error
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
        const displayList = computed(() => displayName.value.replaceAll('<br>', '\n'));

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
                        message: 'File size exceeds the specified allowed size.',
                        files: tooBigFiles
                    } as FileError
                );

                files = files.filter(file => file.size <= props.maxSize);
            }

            if (props.multiple && props.maxFiles && files.length > props.maxFiles) {
                ctx.emit('update:modelValue', files.splice(0, props.maxFiles));

                ctx.emit('validationError',
                    {
                        message: 'Maximum number of files already been added.',
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
            displayList,
            input,
            omit,
            clearIcon,
            lockIcon
        };
    }
});
</script>

<style lang="scss" scoped>
.value-text {
    min-width: 15ch;
    width: 1px; // hack to force the box into the parent
}

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
