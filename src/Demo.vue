<template>
    <main class="h-full">
        <div class="flex">
            <div class="px-12 shadow-2xl dark:bg-gray-600 dark:text-gray-300 transition">
                <h1 class="text-2xl mt-4 mb-6">
                    Vueish UI
                </h1>
                <div class="flex-col flex">
                    <UIToggle v-model="darkMode"
                              label="Dark Mode"
                              name="dark-mode" />
                    <template v-for="type in Object.keys(routeMap)" :key="type">
                        <h3 class="font-bold mt-6">
                            {{ type }}
                        </h3>
                        <router-link v-for="route in routeMap[type]"
                                     :key="route.path"
                                     :to="route.path">
                            {{ route.meta.label }}
                        </router-link>
                    </template>
                </div>
            </div>

            <UIApp>
                <div class="flex-1 h-screen bg-gray-100 dark:bg-gray-700 transition w-full p-10">
                    <div class="mx-auto" style="max-width: 1000px">
                        <router-view />
                    </div>
                </div>
            </UIApp>
        </div>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';
import UIApp from '@components/app/UIApp.vue';
import UIToggle from '@components/toggle/UIToggle.vue';
import LocalCache from '@helpers/cache/LocalCache';
import { Router, RouteRecord } from 'vue-router';

const cache = new LocalCache('demo');

export default defineComponent({
    name: 'Demo',
    components: { UIToggle, UIApp },

    setup() {
        const instance = getCurrentInstance()!;
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
        const routeMap = computed(() => {
            const routes = (instance.appContext.app.config.globalProperties.$router as Router).getRoutes();
            const map: Record<'Directives' | 'Components', RouteRecord[]> = {};

            routes.forEach(route => {
                if (!Array.isArray(map[route.meta.type])) {
                    map[route.meta.type] = [];
                }

                map[route.meta.type as 'Directives' | 'Components'].push(route);
            });

            return map;
        });

        document.body.classList.add(cache.get('theme', 'light')!);

        return {
            darkMode,
            routeMap
        };
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
