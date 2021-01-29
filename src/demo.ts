import { createApp } from 'vue';
import Demo from './Demo.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import './assets/styles/main.css';

const demos = import.meta.globEager('./components/**/Demo.vue');

const routes = Object.keys(demos)
    .map(path => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        path: '/' + String(demos[path].default.name),
        component: demos[path].default,
        meta: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            label: String(demos[path].default.name)
        }
    }))
    .flat(1) as RouteRecordRaw[];

const router = createRouter({ history: createWebHistory(), routes });

createApp(Demo).use(router).mount('#app');
