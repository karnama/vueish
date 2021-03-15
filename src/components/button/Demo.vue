<template>
    <div class="space-y-2 mb-6">
        <UICheckbox v-model="outline" label="Outline" name="outline" />
        <UICheckbox v-model="minimal" label="Minimal" name="minimal" />
        <UICheckbox v-model="loading" label="Loading" name="loading" />
        <UICheckbox v-model="disabled" label="Disabled" name="disabled" />
        <UICheckbox v-model="large" label="Large Style" name="large" />
    </div>

    <div class="flex flex-wrap justify-between space-x-1">
        <UIButton v-for="(type, index) in styleTypes"
                  :key="type"
                  :type="type"
                  class="my-2 capitalize"
                  :outline="outline"
                  :minimal="minimal"
                  :large="large"
                  :loading="loading"
                  :label="type"
                  :disabled="disabled"
                  @click="stuff(type)">
            <template v-if="index % 2 === 0" #loader>
                Loading...
            </template>
        </UIButton>
    </div>

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
        const outline = ref(false);
        const minimal = ref(false);
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
            outline,
            minimal,
            large
        };
    }
});
</script>
