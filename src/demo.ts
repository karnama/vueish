import { createApp } from 'vue';
import Demo from './Demo.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import './assets/styles/main.scss';
import defaultSettings from '@/defaultSettings';
import tooltip from '@/directives/tooltip';
import outerHtml from '@/directives/outer-html';

const componentDemos = import.meta.globEager('./components/**/Demo.vue') as {
    [path: string]: { default: Record<string, any>};
};
const directiveDemos = import.meta.globEager('./directives/**/Demo.vue');

const demos = Object.assign(componentDemos, directiveDemos);

const routes = Object.keys(demos)
    .map(path => ({
        path: '/' + String(demos[path].default.name),
        component: demos[path].default,
        meta: {
            label: String(demos[path].default.name),
            type: path.includes('directives') ? 'Directives' : 'Components'
        }
    }))
    .flat(1) as RouteRecordRaw[];

const router = createRouter({ history: createWebHistory(), routes });

const app = createApp(Demo)
    .directive('tooltip', tooltip)
    .directive('outer-html', outerHtml)
    .use(router);

app.config.globalProperties.Vueish = defaultSettings;

app.mount('#app');
