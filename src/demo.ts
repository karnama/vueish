import { createApp } from 'vue';
import Demo from './Demo.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import './assets/styles/main.css';

const demos = import.meta.globEager('./components/**/Demo.vue');

const routes = Object.keys(demos)
    .map(path => ({
        path: '/' + demos[path].default.name,
        component: demos[path].default,
        meta: {
            label: demos[path].default.name
        }
    }))
    .flat(1) as RouteRecordRaw[];

const router = createRouter({ history: createWebHistory(), routes });

createApp(Demo).use(router).mount('#app');
