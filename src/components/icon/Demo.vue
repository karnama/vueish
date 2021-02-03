<template>
    <UIIcon plus-circle />
    <UIIcon x-circle />
    <UIIcon database />
    <UIIcon credit-card />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIIcon from '@components/icon/UIIcon.vue';

export default defineComponent({
    name: 'Icon',

    components: { UIIcon }
});
</script>
