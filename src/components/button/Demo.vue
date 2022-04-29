<template>
    <div class="space-y-2 mb-6">
        <UICheckbox v-model="outline" label="Outline" name="outline" />
        <UICheckbox v-model="minimal" label="Minimal" name="minimal" />
        <UICheckbox v-model="loading" label="Loading" name="loading" />
        <UICheckbox v-model="disabled" label="Disabled" name="disabled" />
        <UICheckbox v-model="large" label="Large Style" name="large" />
        <UICheckbox v-model="small" label="Small Style" name="small" />
    </div>

    <div class="flex flex-wrap justify-between space-x-1">
        <UIButton v-for="(category, index) in styleTypes"
                  :key="category"
                  :category="category"
                  class="my-2 capitalize"
                  :outline="outline"
                  :minimal="minimal"
                  :large="large"
                  :small="small"
                  :loading="loading"
                  :label="category"
                  :disabled="disabled"
                  @click="clicked = category">
            <template v-if="index % 2 === 0" #loader>
                Loading...
            </template>
        </UIButton>
    </div>

    <p v-show="clicked" class="mt-5 text-color-muted">
        Last clicked button: {{ clicked }}
    </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { styleTypes } from 'types';

export default defineComponent({
    name: 'ButtonDemo',

    setup() {
        const disabled = ref(false);
        const loading = ref(false);
        const outline = ref(false);
        const minimal = ref(false);
        const large = ref(false);
        const small = ref(false);
        const clicked = ref('');

        return {
            styleTypes,
            disabled,
            loading,
            clicked,
            outline,
            minimal,
            large,
            small
        };
    }
});
</script>
