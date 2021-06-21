<template>
    <UIToggle v-model="value"
              name="toggle"
              label="Toggle"
              class="mb-8" />

    <UIToggle v-model="value" name="disabled-toggle" disabled>
        <template #label>
            Disabled Toggle
        </template>
    </UIToggle>

    <p class="text-color mt-8">
        toggles are {{ value ? '' : 'not' }} toggled
    </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIToggle from '@components/toggle/UIToggle.vue';

export default defineComponent({
    name: 'Toggle',

    components: { UIToggle },

    setup: () => ({ value: ref(false) })

});
</script>
