import { createApp } from 'vue';
import DemoBoard from './DemoBoard.vue';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/styles/main.scss';
import Vueish from './main';
import type { RouteRecordRaw } from 'vue-router';

const componentDemos =
    import.meta.globEager('./components/**/Demo.vue') as Record<string, { default: Record<string, any>}>;
const directiveDemos = import.meta.globEager('./directives/**/Demo.vue');

const demos = Object.assign(componentDemos, directiveDemos);
const routes = Object.keys(demos)
    .sort()
    .map(path => ({
        path: '/' + String(demos[path].default.name),
        component: async () => import(/* @vite-ignore */path),
        meta: {
            label: String(demos[path].default.name),
            type: path.includes('directives') ? 'Directives' : 'Components'
        }
    }))
    .flat(1) as RouteRecordRaw[];

const router = createRouter({ history: createWebHistory(), routes });

createApp(DemoBoard)
    .use(Vueish)
    .use(router)
    .mount('#app');
