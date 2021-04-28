import type { App, Plugin } from '@vue/runtime-core';
import type { DefineComponent } from 'vue';
import type { Settings, DeepPartial } from '@/types';
import { merge } from 'lodash-es';
import defaultSettings from './defaultSettings';
import * as directives from './directives';

const componentModules = import.meta.globEager('./**/UI*.vue');
const components: DefineComponent[] = Object.keys(componentModules)
    .map(modulePath => componentModules[modulePath].default)
    .flat(1);

export default {
    install: (app: App, setting: DeepPartial<Settings> = {}): void => {
        app.config.globalProperties.Vueish = merge(defaultSettings, setting);

        components.forEach(component => app.component(component.name, component));

        Object.keys(directives).forEach(name => {
            // @ts-expect-error
            app.directive(name, directives[name]);
        });
    }
} as Plugin;
