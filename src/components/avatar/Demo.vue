<template>
    <p class="text-color">
        Using the default slot
    </p>
    <UIAvatar>hi</UIAvatar>

    <p class="text-color">
        No props/slot with squared
    </p>
    <UIAvatar squared />

    <p class="text-color">
        Small sizing with tw classes
    </p>
    <UIAvatar alt="Person" class="override" />

    <p class="text-color">
        Default
    </p>
    <UIAvatar>OP</UIAvatar>

    <p class="text-color">
        Large sizing with tw classes
    </p>
    <UIAvatar src="https://picsum.photos/50?random=1" class="!h-12 !w-12" />

    <p class="mt-12 text-color">
        Avatar group
    </p>
    <UIAvatarGroup class="!h-12 !w-12 bg-green-700">
        <UIAvatar alt="smt" />
        <UIAvatar src="https://picsum.photos/50?random=3" />
        <UIAvatar src="https://picsum.photos/50?random=4" />
        <UIAvatar alt="smt" />
        <UIAvatar alt="smt" />
        <UIAvatar alt="smt" />
    </UIAvatarGroup>

    <p class="mt-12 text-color">
        Avatar group (reverse stacking)
    </p>
    <UIAvatarGroup class="!h-12 !w-12" reverse-stacking>
        <UIAvatar alt="smt" />
        <UIAvatar src="https://picsum.photos/50?random=5" />
        <UIAvatar src="https://picsum.photos/50?random=6" />
        <UIAvatar alt="smt" />
        <UIAvatar alt="smt" />
        <UIAvatar alt="smt" />
    </UIAvatarGroup>

    <p class="mt-12 text-color">
        Avatar group (with avatars as prop)
    </p>
    <UIAvatarGroup :avatars="avatars" class="!h-10 !w-10" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Avatar } from '@/types';

export default defineComponent({
    name: 'Avatar',

    setup() {
        return {
            avatars: [
                {},
                { src: 'https://picsum.photos/50?random=7', squared: true },
                { alt: 'M' },
                { content: 'MY' }
            ] as Avatar[]
        };
    }
});
</script>

<style>
.override {
    height: theme('spacing.6') !important;
    width: theme('spacing.6') !important;
    line-height: theme('lineHeight.5') !important;
    font-size: theme('fontSize.sm') !important;
}
</style>
