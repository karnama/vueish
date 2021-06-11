<template>
    <div class="flex items-center justify-between relative">
        <div class="flex items-center flex-row overflow-hidden">
            <UIAvatar :src="src" class="mr-4 avatar text-sm" :content="extension" />
            <p :title="file.name" class="file-name">
                {{ file.name }}
                <br>
                <small>{{ size }}</small>
            </p>
        </div>
        <button class="ml-2 p-1 transition hover:text-white hover:bg-red-600 rounded"
                @click="$emit('removed', file)"
                v-html="clearIcon" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import UIAvatar from '@components/avatar/UIAvatar.vue';
import { getIcon } from '@/helpers';

export default defineComponent({
    name: 'UIFile',
    components: { UIAvatar },
    props: {
        file: {
            type: File,
            required: true
        },

        uploadOnMounted: {
            type: Boolean,
            default: false
        },

        upload: {
            type: Function as PropType<(files: File|File[]) => Promise<void>>,
            required: true
        }
    },

    emits: ['removed'],

    setup: (props) => {
        const clearIcon = getIcon('clear');

        const src = ref<string | ArrayBuffer | null>();

        const isImage = computed(() => RegExp(/[/.](gif|jp(e)?g|png)$/).exec(props.file.name.toLowerCase()));
        const extension = computed(() => RegExp(/(?:\.([^.]+))?$/).exec(props.file.name.toLowerCase())[1]!);
        const size = computed(() => {
            const sizeInMb = props.file.size / 1024 / 1024;

            if (sizeInMb < 0.1) {
                return (sizeInMb * 1024).toPrecision(2) + ' KB';
            }

            return sizeInMb.toPrecision(2) + ' MB';
        });

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

            await props.upload([props.file]);
        });

        return {
            size,
            extension,
            src,
            clearIcon
        };
    }
});
</script>

<style scoped lang="scss">
.file-name {
    @apply truncate;
    width: available;
}
.avatar {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
}
</style>
