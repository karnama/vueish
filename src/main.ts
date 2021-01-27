import type { App } from '@vue/runtime-core';
import type { DefineComponent } from 'vue';

const componentModules = import.meta.globEager('./**/UI*.vue');
const components: DefineComponent[] = Object.keys(componentModules)
    .map(modulePath => componentModules[modulePath].default)
    .flat(1);

export default {
    install: (Vue: App): void => {
        components.forEach(component => Vue.component(component.name, component));
    }
};
