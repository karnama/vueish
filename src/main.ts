import type { App } from '@vue/runtime-core';
import type { DefineComponent } from 'vue';

const componentModules = import.meta.globEager('./**/UI*.vue');
const components: DefineComponent[] = Object.keys(componentModules)
    .map(modulePath => componentModules[modulePath].default)
    .flat(1);

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type Icon = 'clear';

export type Settings = {
    icons: Record<Icon, string>;
};

export default {
    install: (Vue: App, setting?: DeepPartial<Settings>): void => {
        Vue.config.globalProperties.Vueish = setting ?? {};
        components.forEach(component => Vue.component(component.name, component));
    }
};
