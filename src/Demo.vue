<template>
    <main class="h-full p-10">
        <div class="flex">
            <div class="mr-10">
                <h1 class="text-2xl mb-5">Vueish UI</h1>
                <div class="space-y-1 flex-col flex">
                    <router-link v-for="route in $router.getRoutes()"
                                 :key="route.path"
                                 :to="route.path">
                        {{ route.meta.label }}
                    </router-link>
                </div>
            </div>
            <div class="flex-1 container mx-auto bg-gray-50 h-full themed light p-10 text-center">
                <router-view/>
            </div>
        </div>
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
