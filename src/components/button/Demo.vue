<template>
    <UICheckbox v-model="loading" label="Loading" name="loading" />
    <UICheckbox v-model="disabled"
                label="Disabled"
                name="disabled"
                class="my-4" />
    <div class="flex justify-evenly flex-wrap">
        <UIButton v-for="(type, index) in styleTypes"
                  :key="type"
                  :type="type"
                  class="m-2"
                  :loading="loading"
                  :disabled="disabled"
                  @click="stuff(type)">
            {{ type }}
            <template v-if="index > (styleTypes.length / 2)" #loader>Loading...</template>
        </UIButton>
    </div>

    <p v-show="clicked">
        Last clicked button: {{ clicked }}
    </p>
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
        const loading = ref(false);
        const clicked = ref('');
        const stuff = (type: string) => {
            clicked.value = type;
        };

        return {
            styleTypes,
            disabled,
            loading,
            clicked,
            stuff
        };
    }
});
</script>
