import type { App, Plugin } from '@vue/runtime-core';
import type { DefineComponent } from 'vue';
import type { Settings, DeepPartial } from '@/types';
import { merge } from 'lodash-es';
import defaultSettings from './defaultSettings';
import tooltip from './directives/tooltip';
import intersect from './directives/intersect';
import clickAway from './directives/clickAway';

const componentModules = import.meta.globEager('./**/UI*.vue');
const components: DefineComponent[] = Object.keys(componentModules)
    .map(modulePath => componentModules[modulePath].default)
    .flat(1);

export default {
    install: (app: App, setting: DeepPartial<Settings> = {}): void => {
        app.config.globalProperties.Vueish = merge(defaultSettings, setting);

        components.forEach(component => app.component(component.name, component));

        app.directive('tooltip', tooltip);
        app.directive('intersect', intersect);
        app.directive('clickAway', clickAway);
    }
} as Plugin;
