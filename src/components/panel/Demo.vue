<template>
    <UIPanel no-collapse
             closed
             appear
             :loading="loading"
             header="Non-Collapsible Panel"
             class="group bg-white">
        <template #actions>
            <UIButton type="brand" class="opacity-0 group-hover:opacity-100 transition-all">
                Edit
            </UIButton>
        </template>

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, eligendi, odio! Alias asperiores debitis
        facere fugiat iusto nesciunt officiis, praesentium quae, quidem, quis similique tempora. Beatae deleniti
        illum rem tempora.

        <template #footer>
            Footer information here
        </template>
    </UIPanel>

    <UIPanel id="collapsible-panel"
             closed
             appear
             class="mt-10 bg-white"
             :loading="loading">
        <template #header>
            Collapsible Panel
        </template>

        <template #actions>
            <UIButton type="brand">
                Edit
            </UIButton>
        </template>

        <h3 class="font-bold">
            This panel will remember its closed status.
        </h3>
        <br>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, eligendi, odio! Alias asperiores debitis
        facere fugiat iusto nesciunt officiis, praesentium quae, quidem, quis similique tempora. Beatae deleniti
        illum rem tempora.

        <template #footer>
            Footer information here
        </template>
    </UIPanel>

    <UIPanel class="mt-10 bg-white"
             closed
             blocking-loader
             :no-collapse="false"
             :loading="loading">
        <p>Without header -> cannot be collapsed regardless of props</p>
        <p>Without footer</p>
        <b>Using blocking loader</b>
    </UIPanel>

    <UICheckbox v-model="loading" label="Loading" class="mt-6" name="loading" />
</template>

<script lang="ts">
import UIPanel from './UIPanel.vue';
import { defineComponent, ref } from 'vue';
import UIButton from '../button/UIButton.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';

export default defineComponent({
    name: 'Panel',

    components: { UICheckbox, UIButton, UIPanel },

    setup() {
        const loading = ref(false);
        const collapsible = ref(true);

        return { loading, collapsible };
    }
});
</script>
