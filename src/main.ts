import type { App } from '@vue/runtime-core';
import type { DefineComponent } from 'vue';
import type { Settings, DeepPartial } from '@/types';
import { merge } from 'lodash-es';
import defaultSettings from './defaultSettings';

const componentModules = import.meta.globEager('./**/UI*.vue');
const components: DefineComponent[] = Object.keys(componentModules)
    .map(modulePath => componentModules[modulePath].default)
    .flat(1);

export default {
    install: (Vue: App, setting: DeepPartial<Settings> = {}): void => {
        Vue.config.globalProperties.Vueish = merge(defaultSettings, setting);
        components.forEach(component => Vue.component(component.name, component));
    }
};
