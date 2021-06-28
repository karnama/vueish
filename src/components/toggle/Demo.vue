<template>
    <div class="flex justify-evenly mb-6">
        <UIButton category="danger" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <UIToggle v-model="value"
              name="toggle"
              label="Toggle"
              :error="error"
              class="mb-8" />

    <UIToggle v-model="value"
              name="disabled-toggle"
              disabled
              :error="error">
        <template #label>
            Disabled Toggle
        </template>
    </UIToggle>

    <p class="text-color mt-8">
        toggles are {{ value ? '' : 'not ' }}toggled
    </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIToggle from '@components/toggle/UIToggle.vue';
import UIButton from '@components/button/UIButton.vue';

export default defineComponent({
    name: 'Toggle',

    components: { UIButton, UIToggle },

    setup: () => {
        const value = ref(false);
        const error = ref('');

        return {
            value,
            error
        };
    }

});
</script>
