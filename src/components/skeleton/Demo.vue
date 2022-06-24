<template>
    <UICheckbox v-model="pulse" name="pulse" label="Use pulse animation" />

    <div class="grid grid-cols-3 gap-3">
        <UISkeleton :pulse="pulse" class="w-24 !h-24 rounded-full mx-auto col-span-3 md:col-span-1 order-first" />
        <div class="space-y-1 col-span-3 md:col-span-2 flex flex-col justify-center">
            <UISkeleton :pulse="pulse" class="!h-4" />
            <UISkeleton :pulse="pulse" class="!h-4" />
            <UISkeleton :pulse="pulse" class="!h-4" />
        </div>
        <div class="flex col-span-3 md:col-span-1 space-x-1 justify-center mt-4 order-first md:order-none">
            <UISkeleton :pulse="pulse" class="!h-6 w-10" />
            <UISkeleton :pulse="pulse" class="!h-6 w-10" />
            <UISkeleton :pulse="pulse" class="!h-6 w-10" />
            <UISkeleton :pulse="pulse" class="!h-6 w-10" />
        </div>
        <div class="col-span-2" />
        <div class="col-span-3 flex items-center justify-between flex-wrap">
            <div class="w-1/3 shadow bg-gray-100 dark:bg-gray-650">
                <div class="p-3 space-y-2">
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-2/3" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-1/2" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-1/4" />
                </div>
                <div class="bg-gray-200 dark:bg-gray-600 flex p-4 justify-end">
                    <UISkeleton :pulse="pulse" class="!h-8 w-20" />
                </div>
            </div>
            <div class="w-1/3 shadow bg-gray-100 dark:bg-gray-650">
                <div class="p-3 space-y-2">
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-2/3" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-1/2" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-1/4" />
                </div>
                <div class="bg-gray-200 dark:bg-gray-600 flex p-4 justify-end">
                    <UISkeleton :pulse="pulse" class="!h-8 w-20" />
                </div>
            </div>
            <div class="w-1/4 shadow bg-gray-100 dark:bg-gray-650">
                <div class="p-3 space-y-2">
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-2/3" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-1/2" />
                    <UISkeleton :pulse="pulse" class="!h-4 w-1/4" />
                </div>
                <div class="bg-gray-200 dark:bg-gray-600 flex p-4 justify-end">
                    <UISkeleton :pulse="pulse" class="!h-8 w-20" />
                </div>
            </div>
        </div>
        <div class="col-span-2 flex justify-center mt-4">
            <!-- eslint-disable max-len -->
            <UISkeleton :pulse="pulse" class="!h-12 w-12" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);" />
            <UISkeleton :pulse="pulse" class="!h-12 w-12" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);" />
            <UISkeleton :pulse="pulse" class="!h-12 w-12" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);" />
            <UISkeleton :pulse="pulse" class="!h-12 w-12" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);" />
            <UISkeleton :pulse="pulse" class="!h-12 w-12" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'SkeletonDemo',

    setup: () => {
        return {
            pulse: ref(false)
        };
    }
});
</script>
