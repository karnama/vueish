<template>
    <UICheckbox v-model="disabled" label="Disabled" name="Disabled" />
    <div class="flex justify-evenly flex-wrap">
        <UIButton v-for="type in styleTypes"
                  :key="type"
                  :type="type"
                  class="m-2"
                  :disabled="disabled">
            {{ type }}
        </UIButton>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { styleTypes } from '@/types';
import UIButton from './UIButton.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Button',
    components: { UICheckbox, UIButton },
    setup() {
        const disabled = ref(false);

        return { styleTypes, disabled };
    }
});
</script>
