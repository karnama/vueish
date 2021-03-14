<template>
    <div class="space-y-2 mb-6">
        <UICheckbox v-model="secondary" label="Secondary" name="secondary" />
        <UICheckbox v-model="ternary" label="Ternary" name="ternary" />
        <UICheckbox v-model="loading" label="Loading" name="loading" />
        <UICheckbox v-model="disabled" label="Disabled" name="disabled" />
        <UICheckbox v-model="large" label="Large Style" name="large" />
    </div>

    <UIButton v-for="(type, index) in styleTypes"
              :key="type"
              :type="type"
              class="mr-2 capitalize"
              :secondary="secondary"
              :ternary="ternary"
              :large="large"
              :loading="loading"
              :label="type"
              :disabled="disabled"
              @click="stuff(type)">
        <template v-if="index % 2 === 0" #loader>
            Loading...
        </template>
    </UIButton>

    <p v-show="clicked" class="mt-5">
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
        const secondary = ref(false);
        const ternary = ref(false);
        const large = ref(false);
        const clicked = ref('');
        const stuff = (type: string) => {
            clicked.value = type;
        };

        return {
            styleTypes,
            disabled,
            loading,
            clicked,
            stuff,
            secondary,
            ternary,
            large
        };
    }
});
</script>
