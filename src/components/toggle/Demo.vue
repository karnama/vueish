<template>
    <UIToggle name="toggle" label="Toggle" class="mb-4" />
    <UIToggle name="disabled-toggle" disabled :class="{ 'mt-8': true }">
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
