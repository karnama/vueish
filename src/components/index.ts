import { DefineComponent } from 'vue';

const componentModules = import.meta.globEager('./**/UI*.vue');
const components: Record<string, DefineComponent> = {};

Object.keys(componentModules)
    .map(modulePath => componentModules[modulePath].default)
    .flat(1)
    .forEach((component: DefineComponent) => components[component.name] = component);

export default components;
