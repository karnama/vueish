<template>
    <main class="h-full">
        <div class="flex">
            <div class="px-12 shadow-xl dark:bg-gray-600 dark:text-gray-300 transition relative">
                <h1 class="text-2xl mt-4 mb-6">
                    Vueish UI
                </h1>
                <div class="space-y-1 flex-col flex">
                    <UIToggle v-model="darkMode"
                              label="Dark Mode"
                              name="dark-mode"
                              class="mb-4" />
                    <router-link v-for="route in $router.getRoutes()"
                                 :key="route.path"
                                 :to="route.path">
                        {{ route.meta.label }}
                    </router-link>
                </div>
            </div>

            <UIApp>
                <div class="flex-1 min-h-screen h-full bg-gray-100 dark:bg-gray-700 transition w-full p-10">
                    <div class="mx-auto" style="max-width: 1000px">
                        <router-view />
                    </div>
                </div>
            </UIApp>
        </div>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import UIApp from '@components/app/UIApp.vue';
import UIToggle from '@components/toggle/UIToggle.vue';
import LocalCache from '@helpers/cache/LocalCache';

const cache = new LocalCache('demo');

export default defineComponent({
    name: 'Demo',
    components: { UIToggle, UIApp },

    setup() {
        const darkMode = computed({
            get: () => {
                const theme = cache.get('theme', 'light') as 'dark' | 'light';
                return theme === 'dark';
            },
            set: (val: boolean) => {
                cache.set('theme', val ? 'dark' : 'light');
                document.body.classList.toggle('dark');
                document.body.classList.toggle('light');
            }
        });

        document.body.classList.add(cache.get('theme', 'light')!);

        return { darkMode };
    }
});
</script>

<style>
.router-link-active {
    @apply text-green-600;
}
.dark .router-link-active {
    @apply text-green-400;
}
</style>
