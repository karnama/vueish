import { createApp } from 'vue';
import Demo from './Demo.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import './assets/styles/main.css';
import { DeepPartial, default as Vueish, Settings } from './main';

const demos = import.meta.globEager('./components/**/Demo.vue') as { [path: string]: { default: Record<string, any>} };

const routes = Object.keys(demos)
    .map(path => ({
        path: '/' + String(demos[path].default.name),
        component: demos[path].default,
        meta: {
            label: String(demos[path].default.name)
        }
    }))
    .flat(1) as RouteRecordRaw[];

const router = createRouter({ history: createWebHistory(), routes });

const settings: DeepPartial<Settings> = {
    icons: {
        clear: 'mdi mdi-home'
    }
};

createApp(Demo)
    .use(router)
    .use(Vueish, settings)
    .mount('#app');
