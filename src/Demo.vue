<template>
    <main class="h-full transition-colors bg-gray-100 dark:bg-gray-700 relative">
        <div class="flex">
            <div class="menu px-12 shadow-xl dark:bg-gray-600 dark:text-gray-300 z-30 bg-white"
                 :class="[ isOpen ? 'open' : 'closed' ]">
                <div class="sticky top-0">
                    <div class="flex items-center justify-between">
                        <h1 class="text-2xl mt-4 mb-6">
                            Vueish UI
                        </h1>
                        <UIButton minimal
                                  class="dark:text-gray-200"
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
                                         :to="route.path">
                                {{ route.meta.label }}
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>
            <div class="flex-1 min-h-screen h-full w-full p-10">
                <UIButton v-if="!isOpen"
                          class="dark:text-gray-200 mb-4"
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
                    <router-view />
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue';
import UIToggle from '@components/toggle/UIToggle.vue';
import LocalCache from '@helpers/cache/LocalCache';
import { Router, RouteRecord } from 'vue-router';
import UIButton from '@components/button/UIButton.vue';
import { getIcon } from '@/helpers';

const cache = new LocalCache('demo');

export default defineComponent({
    name: 'Demo',
    components: { UIButton, UIToggle },

    setup() {
        const instance = getCurrentInstance()!;
        const clearIcon = getIcon('clear');

        const darkMode = ref(cache.get<'light' | 'dark'>('theme', 'light') === 'dark');
        const routeMap = computed(() => {
            const routes = (instance.appContext.app.config.globalProperties.$router as Router).getRoutes();
            const map: { Directives?: RouteRecord[]; Components?: RouteRecord[] } = {};

            routes.forEach(route => {
                if (!Array.isArray(map[route.meta.type])) {
                    map[route.meta.type] = [];
                }

                map[route.meta.type]!.push(route);
            });

            return map;
        });
        const isOpen = ref(cache.get('menuOpen', true));

        document.body.classList.add(cache.get('theme', 'light')!);

        watch(() => isOpen.value, val => cache.set('menuOpen', val));
        watch(() => darkMode.value, val => {
            cache.set('theme', val ? 'dark' : 'light');
            document.body.classList.toggle('dark');
            document.body.classList.toggle('light');
        });

        return {
            darkMode,
            routeMap,
            isOpen,
            clearIcon
        };
    }
});
</script>

<style lang="scss">
.router-link-active {
    @apply text-green-600;
}

.dark .router-link-active {
    @apply text-green-400;
}

.menu {
    width: 300px;
    transition: margin-left 300ms ease;

    &.closed {
        margin-left: -300px;
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
