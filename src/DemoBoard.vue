<template>
    <main class="h-full transition-colors bg-gray-100 dark:bg-gray-700">
        <div class="flex">
            <!-- Menu -->
            <div class="menu px-12 shadow-xl dark:bg-gray-600 dark:text-gray-300 z-30 bg-white"
                 :class="[ isOpen ? 'open' : 'closed' ]">
                <div class="sticky top-0">
                    <div class="flex items-center justify-between">
                        <div class="mt-4 mb-6">
                            <h1 class="text-2xl whitespace-nowrap">
                                Vueish UI
                            </h1>
                            <small>v{{ version }}</small>
                        </div>

                        <UIButton minimal
                                  class="dark:text-gray-200 dark:hover:text-gray-700"
                                  @click="isOpen = false"
                                  v-html="clearIcon" />
                    </div>
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
                                         class="capitalize"
                                         :to="route.path">
                                {{ route.meta.label }}
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>

            <div class="flex-1 min-h-screen h-full w-full p-10">
                <UIButton v-if="!isOpen"
                          class="dark:text-gray-200 dark:hover:text-gray-700 mb-4"
                          minimal
                          @click="isOpen = true">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         height="20px"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </UIButton>
                <div class="mx-auto" style="max-width: 1000px">
                    <h1 v-if="$route.meta.label" class="text-2xl mb-2 text-center text-color">
                        {{ $route.meta.label }}
                    </h1>
                    <RouterView />
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue';
import LocalCache from '@/helpers/cache/LocalCache';
import type { Router, RouteRecord } from 'vue-router';
import { getIcon } from '@/helpers';
import { getVersion } from '@/main';

const cache = new LocalCache('demo');

export default defineComponent({
    name: 'DemoBoard',

    setup() {
        const instance = getCurrentInstance()!;
        const clearIcon = getIcon('clear');
        const version = getVersion();

        const darkMode = ref(cache.get<'light' | 'dark'>('theme', 'light') === 'dark');
        const routeMap = computed(() => {
            const routes = (instance.appContext.app.config.globalProperties.$router as Router).getRoutes();
            const map: { Directives?: RouteRecord[]; Components?: RouteRecord[] } = {};

            routes.forEach(route => {
                if (route.path === '/') return;

                if (!Array.isArray(map[route.meta.type])) {
                    map[route.meta.type] = [];
                }

                map[route.meta.type]!.push(route);
            });

            return map;
        });
        const isOpen = ref(cache.get('menuOpen', true));

        const setBg = (dark: boolean) => {
            if (dark) {
                document.body.classList.add('bg-gray-700');
                document.body.classList.remove('bg-gray-100');
                return;
            }

            document.body.classList.remove('bg-gray-700');
            document.body.classList.add('bg-gray-100');
        };

        document.body.classList.add(cache.get('theme', 'light')!);
        setBg(cache.get<'light' | 'dark'>('theme', 'light') === 'dark');

        watch(() => isOpen.value, val => cache.set('menuOpen', val));
        watch(() => darkMode.value, val => {
            cache.set('theme', val ? 'dark' : 'light');
            document.body.classList.toggle('dark');
            setBg(val);
        });

        return {
            darkMode,
            routeMap,
            isOpen,
            clearIcon,
            version
        };
    }
});
</script>

<style lang="scss" scoped>
.router-link-active {
    @apply text-brand-600;
}

.dark .router-link-active {
    @apply text-brand-400;
}

.menu {
    width: 250px;
    transition: margin-left 300ms ease;

    &.closed {
        margin-left: -250px;
        transition: margin-left 300ms ease, opacity 300ms ease-out;
        opacity: 0;
    }
    &.open {
        transition: margin-left 300ms ease, opacity 300ms ease-out;
        opacity: 1;
        margin-left: 0;
    }
}
</style>
