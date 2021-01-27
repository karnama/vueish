import { createApp } from 'vue';
import Demo from './Demo.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import './assets/styles/main.css';

const demos = import.meta.globEager('./components/**/Demo.vue');

const routes = Object.keys(demos)
    .map(path => ({
        path: path.slice(1),
        component: demos[path].default
    }))
    .flat(1) as RouteRecordRaw[];

const router = createRouter({ history: createWebHistory(), routes });

createApp(Demo).use(router).mount('#app');
