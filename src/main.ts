import type { App, Plugin } from '@vue/runtime-core';
import type { DefineComponent } from 'vue';
import type { DeepPartial } from './types';
import type { Settings } from '@public-types';
import { merge } from 'lodash-es';
import defaultSettings from './defaultSettings';
import tooltip from './directives/tooltip';
import intersect from './directives/intersect';
import outerHtml from './directives/outer-html';
import clickAway from './directives/click-away';
import './assets/styles/main.scss';

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
        app.directive('outer-html', outerHtml);
    }
} as Plugin;

export function getVersion(): string {
    return __VUEISH_VERSION__;
}
