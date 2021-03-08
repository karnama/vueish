<template>
    <template v-if="$slots.default">
        <slot />
    </template>
    <ul v-else class="flex items-center flex-wrap">
        <li v-for="(crumb, index) in routeCrumbs" :key="crumb.path">
            <slot :name="crumb.path" :route="crumb">
                <router-link v-if="$router.currentRoute.path !== crumb.path" :to="crumb">
                    {{ crumb?.meta?.label ?? crumb.path.slice(1) }}
                </router-link>
                <template v-else>
                    {{ crumb?.meta?.label ?? crumb.path.slice(1) }}
                </template>
            </slot>
            <slot name="separator"
                  :previous="crumb"
                  :next="routeCrumbs[index + 1]">
                {{ routeCrumbs[index + 1] ? separator : '' }}
            </slot>
        </li>
    </ul>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';
import type { PropType } from 'vue';
import type { Router, RouteLocation } from 'vue-router';

// todo - vertical

export default defineComponent({
    name: 'UIBreadcrumbs',

    props: {
        separator: {
            type: String,
            default: '/'
        },

        crumbs: {
            type: Array as PropType<string[]>
        }
    },

    setup() {
        const routeCrumbs = computed<boolean | RouteLocation[]>(() => {
            const instance = getCurrentInstance();
            if (!instance) {
                return false;
            }

            const router = getCurrentInstance()!.appContext.config.globalProperties.$router as Router;
            const routes: RouteLocation[] = [];
            router.currentRoute.value.path.split('/').reduce((previous, next) => {
                if (next) {
                    routes.push(router.resolve(next));
                    return '/' + next;
                }
            }, '');

            return routes;
        });

        return {
            routeCrumbs
        };
    }
});
</script>
