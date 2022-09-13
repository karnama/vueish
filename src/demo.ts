import { createApp, h } from 'vue';
import DemoBoard from './DemoBoard.vue';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/styles/main.scss';
import { createUILibrary } from './main';
import type { RouteRecordRaw } from 'vue-router';

const componentDemos = import.meta.glob('./components/**/Demo.vue');
const directiveDemos = import.meta.glob('./directives/**/Demo.vue');

const demos = Object.assign(componentDemos, directiveDemos);
const routes = Object.keys(demos)
    .sort()
    .map(path => {
        const isDirective = path.includes('directives');
        const getPath = (path: string): string => {
            const startToken = isDirective ? 'directives/' : 'components/';
            return path.substring(
                path.lastIndexOf(startToken) + startToken.length,
                path.indexOf('/Demo.vue')
            );
        };

        return {
            path: '/' + getPath(path),
            component: async () => demos[path](),
            meta: {
                label: getPath(path).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                type: isDirective ? 'Directives' : 'Components'
            }
        } as RouteRecordRaw;
    });

routes.push({
    path: '/',
    name: 'landing',
    component: {
        render: () => h(
            'h1',
            { classList: 'text-color-muted text-center text-2xl select-none' },
            'No component found at this route.'
        )
    }
});

const router = createRouter({ history: createWebHistory(), routes });

createApp(DemoBoard)
    .use(createUILibrary())
    .use(router)
    .mount('#app');
