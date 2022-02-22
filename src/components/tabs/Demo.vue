<template>
    <UITabs class="mb-4">
        <UITab title="title 1">
            tab 1
        </UITab>
        <UITab tab-key="fsss">
            <template #title>
                title 2
            </template>
            tab 2
        </UITab>
    </UITabs>

    <UITabs vertical>
        <UITab title="vertical" tab-key="no">
            tab 1
        </UITab>
        <UITab title="tabs" tab-key="hi">
            <UISubComponent />
        </UITab>
    </UITabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UITabs from './UITabs.vue';
import UITab from './UITab.vue';
import UISubComponent from 'components/tabs/UISubComponent.vue';

export default defineComponent({
    name: 'TabsDemo',

    components: { UISubComponent, UITabs, UITab }
});
</script>
