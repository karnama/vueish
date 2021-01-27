<template>
    <main class="h-full container mx-auto bg-gray-50 h-full themed light p-10 text-center">
        <h1>Vueish Demo</h1>
        <div class="flex justify-evenly items-center">
            <router-link v-for="route in $router.getRoutes()"
                         :key="route.path"
                         :to="route.path"
                         class="p-3"
            >
                {{ route.path }}
            </router-link>
        </div>
        <router-view />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'Demo' });
</script>

<style>
.router-link-active {
    @apply text-green-600;
}
</style>
