<template>
    <main class="h-full">
        <div class="flex">
            <div class="px-12">
                <h1 class="text-2xl mt-4 mb-6">
                    Vueish UI
                </h1>
                <div class="space-y-1 flex-col flex">
                    <router-link v-for="route in $router.getRoutes()"
                                 :key="route.path"
                                 :to="route.path">
                        {{ route.meta.label }}
                    </router-link>
                </div>
            </div>

            <UIApp>
                <div class="flex-1 min-h-screen container mx-auto bg-gray-200 themed light p-10">
                    <div class="mx-auto" style="max-width: 1000px">
                        <router-view />
                    </div>
                </div>
            </UIApp>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIApp from '@components/app/UIApp.vue';

export default defineComponent({
    name: 'Demo',
    components: { UIApp }
});
</script>

<style>
.router-link-active {
    @apply text-green-600;
}
</style>
