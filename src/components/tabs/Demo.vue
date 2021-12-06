<template>
    <UITabs>
        <UITab title="title 1">
            tab 1
        </UITab>
        <UITab>
            <template #title>
                title 2
            </template>
            tab 2
        </UITab>
    </UITabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UITabs from './UITabs.vue';
import UITab from './UITab.vue';

export default defineComponent({
    name: 'TabsDemo',

    components: { UITabs, UITab }
});
</script>
