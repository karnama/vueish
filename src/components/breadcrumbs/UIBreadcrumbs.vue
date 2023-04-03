<template>
    <ul class="flex items-center flex-wrap" :class="{ 'flex-col': vertical }">
        <li v-for="(crumb, index) in routeCrumbs" :key="crumb.path">
            <slot :name="crumb.path.startsWith('/') ? crumb.path.slice(1) : crumb.path" :route="crumb">
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
                {{ routeCrumbs[index + 1] ? '&nbsp;' + separator + '&nbsp;' : '' }}
            </slot>
        </li>
    </ul>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';
import type { PropType } from 'vue';
import type { Router, RouteLocationRaw, RouteLocation } from 'vue-router';

export default defineComponent({
    name: 'UIBreadcrumbs',

    props: {
        /**
         * The separator character to be used.
         */
        separator: {
            type: String,
            default: '/'
        },

        /**
         * The path to display.
         */
        path: {
            type: [Object, String] as PropType<RouteLocationRaw>
        },

        /**
         * Set the orientation to vertical.
         */
        vertical: {
            type: Boolean,
            default: false
        }
    },

    setup(props) {
        const instance = getCurrentInstance()!;

        const routeCrumbs = computed<RouteLocation[]>(() => {
            const router = instance.appContext.config.globalProperties.$router as Router;
            const routes: RouteLocation[] = [];
            const currentRoute = props.path && router.resolve(props.path).matched.length
                ? router.resolve(props.path).path
                : router.currentRoute.value.path;

            currentRoute
                .split('/')
                .splice(1)
                .forEach(crumb => routes.push(router.resolve(crumb)));

            return routes;
        });

        return {
            routeCrumbs
        };
    }
});
</script>
