<template>
    <UIPanel non-collapsible
             closed
             :loading="loading"
             class="group bg-white">
        <template #header>
            Non-Collapsible Panel
        </template>

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

        This panel will remember its closed status.
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
             :non-collapsible="false"
             :loading="loading">
        <p>Without header -> cannot be collapsed regardless of props</p>
        <p>Without footer</p>
    </UIPanel>

    <label>
        loading
        <input v-model="loading" type="checkbox">
    </label>
</template>

<script lang="ts">
import UIPanel from './UIPanel.vue';
import { defineComponent, ref } from 'vue';
import UIButton from '../button/UIButton.vue';

export default defineComponent({
    name: 'Panel',

    components: { UIButton, UIPanel },

    setup() {
        const loading = ref(false);
        const collapsible = ref(true);

        return { loading, collapsible };
    }
});
</script>
