<template>
    <main class="h-full">
        <div class="flex">
            <div class="menu px-12 shadow-xl dark:bg-gray-600 dark:text-gray-300 transition
                        ease-in-out transition-all duration-300 z-30 bg-white relative"
                 :class="{
                     'closed': !isOpen
                 }">
                <h1 class="text-2xl mt-4 mb-6">
                    Vueish UI
                </h1>
                <UIButton class="absolute top-1 right-3 md:top-2 md:right-2"
                          minimal
                          @click="isOpen = !isOpen"
                          v-html="clearIcon" />
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
                <div class="flex-1 min-h-screen h-full bg-gray-100 dark:bg-gray-700 transition w-full p-10">
                    <UIButton v-if="!isOpen"
                              class="absolute top-1 left-1"
                              minimal
                              @click="isOpen = !isOpen">
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
            </UIApp>
        </div>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from 'vue';
import UIApp from '@components/app/UIApp.vue';
import UIToggle from '@components/toggle/UIToggle.vue';
import LocalCache from '@helpers/cache/LocalCache';
import { Router, RouteRecord } from 'vue-router';
import UIButton from '@components/button/UIButton.vue';
import { getIcon } from '@/helpers';

const cache = new LocalCache('demo');

export default defineComponent({
    name: 'Demo',
    components: { UIButton, UIToggle, UIApp },

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
        const isOpen = ref(false);

        document.body.classList.add(cache.get('theme', 'light')!);

        const clearIcon = getIcon('clear');

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
    min-width: 300px;

    &.closed {
        margin-left: -300px;
    }
}
</style>
