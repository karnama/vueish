<template>
    Using the default slot
    <UIAvatar>hi</UIAvatar>

    No props/slot with squared
    <UIAvatar squared />

    Small sizing with tw classes
    <UIAvatar alt="Person" class="override" />
    Default
    <UIAvatar>OP</UIAvatar>
    Large sizing with tw classes
    <UIAvatar src="https://picsum.photos/50?random=1" class="h-12 w-12" />

    <div class="mt-12">
        Avatar group
    </div>
    <UIAvatarGroup class="h-12 w-12 bg-green-700">
        <UIAvatar alt="smt" />
        <UIAvatar src="https://picsum.photos/50?random=3" />
        <UIAvatar src="https://picsum.photos/50?random=4" />
        <UIAvatar alt="smt" />
        <UIAvatar alt="smt" />
        <UIAvatar alt="smt" />
    </UIAvatarGroup>

    <div class="mt-12">
        Avatar group (reverse stacking)
    </div>
    <UIAvatarGroup class="h-12 w-12" reverse-stacking>
        <UIAvatar alt="smt" />
        <UIAvatar src="https://picsum.photos/50?random=5" />
        <UIAvatar src="https://picsum.photos/50?random=6" />
        <UIAvatar alt="smt" />
        <UIAvatar alt="smt" />
        <UIAvatar alt="smt" />
    </UIAvatarGroup>

    <div class="mt-12">
        Avatar group (with avatars as prop)
    </div>
    <UIAvatarGroup :avatars="avatars" class="h-10 w-10" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIAvatar from './UIAvatar.vue';
import UIAvatarGroup from './UIAvatarGroup.vue';
import type { Avatar } from '@/types';

export default defineComponent({
    name: 'Avatar',

    components: { UIAvatarGroup, UIAvatar },

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
