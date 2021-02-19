<template>
    <UIToggle name="toggle" label="toggle" />
    <UIToggle name="disabled-toggle" disabled />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIToggle from '@components/toggle/UIToggle.vue';

export default defineComponent({
    name: 'Toggle',
    components: { UIToggle }
});
</script>
