<template>
    <div class="ui-file-input" :class="$attrs.class">
        <UIExpandTransition>
            <label v-if="label || $slots.label"
                   :for="$attrs.id ?? name"
                   class="font-medium text-color flex items-center mb-1.5"
                   :class="{ 'text-color-error': error || $slots.error }">
                <slot name="label">
                    {{ label }}
                </slot>
            </label>
        </UIExpandTransition>

        <div ref="input"
             class="rounded flex justify-between items-stretch shadow-sm focus:outline-none h-auto
                    transition-colors border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 border"
             :title="displayList"
             :class="{
                 'bg-gray-200 dark:!bg-gray-700 cursor-not-allowed': disabled,
                 'cursor-pointer': !disabled,
                 'focus-within:border-blue-400 dark:focus-within:border-blue-500':!(error || $slots.error) && !disabled,
                 'border-red-700 dark:!border-red-500': error || $slots.error,
                 'border-blue-400 dark:border-blue-500': isDraggedOver && !disabled
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
            <div class="flex items-center justify-between w-full" :class="{ 'justify-b' : displayName }">
                <UIButton :large="large"
                          :small="small"
                          :disabled="disabled"
                          theme="default"
                          title="Choose a file"
                          class="h-full border-t-0 rounded-r-none rounded-l-[2.75px] border-l-0 border-b-0">
                    <slot name="buttonText">
                        {{ buttonText }}
                    </slot>
                </UIButton>

                <div class="flex items-center justify-between grow">
                    <div v-if="displayName"
                         class="truncate text-color p-3.5 ml-2 select-none break-words value-text grow"
                         :class="{
                             'px-7 py-5': large,
                             'p-2 ml-0': small,
                         }"
                         v-html="displayName" />
                    <template v-else>
                        <slot name="placeholder">
                            <p class="text-color-muted p-3.5 ml-2 grow"
                               :class="{ 'px-7 py-5': large, 'p-2 ml-0': small }">
                                {{ placeholder }}
                            </p>
                        </slot>
                    </template>

                    <UIFadeTransition duration-out="duration-100" duration-in="duration-100">
                        <span v-if="disabled"
                              class="h-5 w-5 mr-2 mx-auto text-color-muted shrink-0"
                              v-html="lockIcon" />

                        <UISpinnerLoader v-else-if="loading"
                                         :diameter="20"
                                         :stroke="2"
                                         class="mr-3"
                                         :class="{ 'mr-5': large }" />

                        <button v-else-if="clearable && displayName"
                                class="clear-icon h-5 w-5 mr-2 mx-auto text-color-muted"
                                :aria-controls="$attrs.id ?? name"
                                aria-roledescription="clear"
                                @click.stop="$emit('update:modelValue', null)"
                                v-html="clearIcon" />
                    </UIFadeTransition>
                </div>
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
import { createFileList, getSizeString } from 'composables/utils';
import {
    name,
    label,
    clearable,
    autofocus,
    disabled,
    positiveOptionalNumber,
    error,
    large,
    loading,
    small,
    placeholder
} from '@/shared-props';
import { omit } from 'lodash-es';
import { getIcon } from '@/helpers';
import UIFadeTransition from 'components/transitions/UIFadeTransition.vue';
import UIExpandTransition from 'components/transitions/UIExpandTransition.vue';
import type { FileError } from 'types';
import type { MaybeArray } from '../../../types/utilities';

export default defineComponent({
    name: 'UIFileInput',

    components: { UIFadeTransition, UIExpandTransition },

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [File, Array, null] as PropType<MaybeArray<File> | null>
        },

        /**
         * Whether multiple files are accepted.
         *
         * @default false
         */
        multiple: {
            type: Boolean,
            default: false
        },


        /**
         * Accepted mimes in an array format.
         *
         * @default ['*']
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

        /**
         * Override files preview output. It returns the string or html to render.
         */
        displayNameFunc: {
            type: Function as PropType<(file: MaybeArray<File> | null) => string>,
            default: null
        },

        /**
         * The label for file input.
         *
         * @default "Choose file"
         */
        buttonText: {
            type: String,
            default: 'Choose file'
        },

        name,
        label,
        clearable,
        autofocus,
        disabled,
        large,
        error,
        loading,
        small,
        placeholder
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

            if (props.displayNameFunc) {
                return props.displayNameFunc(props.modelValue);
            }

            return (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue])
                .map(file => file.name + ' - ' + size(file)).join('<br>');
        });
        const displayList = computed(() => displayName.value.replaceAll('<br>', '\n'));

        const size = (file: File) => file ? getSizeString(file) : '';
        const addFiles = (event: DragEvent | InputEvent) => {
            isDraggedOver.value = false;

            if (props.disabled) return;

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
                const tooBigFiles = files.filter(file => file.size > props.maxSize!);

                ctx.emit('validationError',
                    {
                        message: 'File size exceeds the specified allowed size.',
                        files: tooBigFiles
                    } as FileError
                );

                files = files.filter(file => file.size <= props.maxSize!);
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
