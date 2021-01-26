<template>
    <main class="h-full container mx-auto bg-gray-50 h-full themed light p-10 text-center">
        <h1>Vueish Demo</h1>
        <div class="py-10 space-y-10">
            <div class="space-x-2">
                <UIButton>Default</UIButton>
                <UIButton type="primary">Primary</UIButton>
                <UIButton type="info">Info</UIButton>
                <UIButton type="success">Success</UIButton>
                <UIButton type="warning">Warning</UIButton>
                <UIButton type="danger">Danger</UIButton>
                <UIButton type="brand">Brand</UIButton>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIButton from './components/button/UIButton.vue';

export default defineComponent({
    name: 'App',
    components: { UIButton }
});
</script>