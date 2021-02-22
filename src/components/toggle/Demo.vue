<template>
    <UIToggle name="toggle" label="Toggle" classes="mb-8" />
    <UIToggle name="disabled-toggle" disabled>
        <template #label>
            Disabled Toggle
        </template>
    </UIToggle>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIToggle from '@components/toggle/UIToggle.vue';

export default defineComponent({
    name: 'Toggle',
    components: { UIToggle }
});
</script>
