<template>
    <div class="flex justify-evenly mb-6">
        <UICheckbox v-model="sm"
                    name="sm"
                    label="Small Style" />
    </div>

    <h2 class="text-color">
        Primary
    </h2>
    <div class="flex justify-evenly flex-wrap">
        <UILabel v-for="theme in themes"
                 :key="theme"
                 :theme="theme"
                 :sm="sm"
                 class="m-2">
            {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
        </UILabel>
    </div>
    <h2 class="text-color">
        Secondary
    </h2>
    <div class="flex justify-evenly flex-wrap">
        <UILabel v-for="theme in themes"
                 :key="theme"
                 secondary
                 rounded
                 :sm="sm"
                 :theme="theme"
                 class="m-2">
            {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
        </UILabel>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { themes } from 'types';

export default defineComponent({
    name: 'LabelDemo',

    setup: () => ({ themes, sm: ref(false) })
});
</script>
