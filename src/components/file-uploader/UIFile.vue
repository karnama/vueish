<template>
    <div class="flex items-center justify-between dark:text-white">
        <div class="flex items-center flex-row overflow-hidden">
            <UISpinnerLoader :determinate="!isLoading" :diameter="50" :stroke="2">
                <UIAvatar :src="src" class="avatar text-xs" :content="extension" />
            </UISpinnerLoader>
            <p :title="file.name" class="ml-4 truncate">
                {{ file.name }}
                <br>
                <small>{{ size }}</small>
            </p>
        </div>
        <UIFadeTransition>
            <template v-if="!isLoading">
                <button v-if="!uploadOnMounted"
                        class="ml-2 p-1 transition-colors hover:text-white hover:bg-red-600 rounded"
                        @click="$emit('removed', file)"
                        v-html="clearIcon" />
                <button v-else-if="failedToUpload"
                        class="transition transform hover:rotate-180 !duration-200"
                        @click="uploadFile"
                        v-html="retryIcon" />
                <span v-else class="text-green-600 dark:text-green-500" v-html="checkIcon" />
            </template>
        </UIFadeTransition>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import UIAvatar from '@components/avatar/UIAvatar.vue';
import { getIcon } from '@/helpers';
import UISpinnerLoader from '@components/loader-spinner/UISpinnerLoader.vue';
import UIFadeTransition from '@components/transitions/UIFadeTransition.vue';
import { getSizeString, isImage as fileIsImage, getExtension } from '@composables/utils';

// todo accept a composable (returns a ref for progress) for upload
export default defineComponent({
    name: 'UIFile',
    components: { UIAvatar, UISpinnerLoader, UIFadeTransition },
    props: {
        /**
         * The file that is being handled.
         */
        file: {
            type: File,
            required: true
        },

        /**
         * Upload as soon as it's mounted.
         */
        uploadOnMounted: {
            type: Boolean,
            default: false
        },

        /**
         * The function that uploads the files.
         */
        upload: {
            type: Function as PropType<(files: File|File[]) => Promise<void>>,
            required: true
        }
    },

    emits: ['removed'],

    setup: (props) => {
        const clearIcon = getIcon('clear');
        const checkIcon = getIcon('check');
        const retryIcon = getIcon('retry');

        const isLoading = ref(false);
        const src = ref<string | ArrayBuffer | null>();
        const failedToUpload = ref(false);

        const isImage = computed(() => fileIsImage(props.file));
        const extension = computed(() => {
            const ext = getExtension(props.file);

            return ext ? '.' + ext : 'file';
        });
        const size = computed(() => getSizeString(props.file));

        const uploadFile = async () => {
            isLoading.value = true;

            await props.upload([props.file])
                .then(resp => {
                    failedToUpload.value = false;
                    return resp;
                })
                .catch(err => {
                    failedToUpload.value = true;
                    return err;
                })
                .finally(() => isLoading.value = false);
        };

        watch(
            () => props.file,
            file => {
                if (!isImage.value) {
                    src.value = null;
                    return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => src.value = reader.result;
            },
            { immediate: true });

        onMounted(async () => {
            if (!props.uploadOnMounted) return;

            await uploadFile();
        });

        return {
            size,
            extension,
            src,
            clearIcon,
            checkIcon,
            retryIcon,
            isLoading,
            failedToUpload,
            uploadFile
        };
    }
});
</script>

<style scoped lang="scss">
.avatar {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
}
</style>
