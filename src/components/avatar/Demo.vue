<template>
<!--    Small sizing with tw classes-->
<!--    <UIAvatar alt="Person" class="override" />-->
<!--    Default-->
<!--    <UIAvatar>OP</UIAvatar>-->
<!--    Large sizing with tw classes-->
<!--    <UIAvatar src="https://picsum.photos/50?random=1" class="h-12 w-12" />-->

    <div class="mt-12">
        Avatar group
    </div>
    <UIAvatarGroup>
        <UIAvatar alt="smt" class="h-12 w-12" />
        <UIAvatar src="https://picsum.photos/50?random=3" class="h-12 w-12" />
        <UIAvatar src="https://picsum.photos/50?random=4" class="h-12 w-12" />
    </UIAvatarGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIAvatar from '@components/avatar/UIAvatar.vue';
import UIAvatarGroup from '@components/avatar/UIAvatarGroup.vue';

export default defineComponent({
    name: 'Avatar',
    components: { UIAvatarGroup, UIAvatar }
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
