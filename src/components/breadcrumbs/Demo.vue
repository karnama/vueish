<template>
    <UIBreadcrumbs />

    <br>
    With Slots
    <UIBreadcrumbs>
        <template #separator="slotProps">
            {{ slotProps.next ? '&nbsp;|&nbsp;': '' }}
        </template>
        <template #breadcrumbs="slotProps">
            slotted {{ slotProps.crumb.path }}
        </template>
    </UIBreadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIBreadcrumbs from '@components/breadcrumbs/UIBreadcrumbs.vue';

export default defineComponent({
    name: 'Breadcrumbs',
    components: { UIBreadcrumbs }
});
</script>
