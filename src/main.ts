import type { App, Plugin } from '@vue/runtime-core';
import type { DeepPartial } from 'types/utilities';
import type { Settings } from 'types';
import defaultSettings from './defaultSettings';
import tooltip from './directives/tooltip';
import intersect from './directives/intersect';
import outerHtml from './directives/outer-html';
import clickAway from './directives/click-away';
import './assets/styles/main.scss';
import type { DefineComponent } from 'vue';
import { defineAsyncComponent } from 'vue';

const componentModules = import.meta.glob('./**/UI*(!(Radio.vue)).vue');
const uIRadioImport = import.meta.globEager('./**/UIRadio.vue');

/**
 * Get the file name without extension.
 *
 * @param {string} path
 */
function getName(path: string): string {
    return path.substring(path.lastIndexOf('/') + 1, path.indexOf('.vue'));
}

export default {
    install: (app: App, setting: DeepPartial<Settings> = {}): void => {
        app.config.globalProperties.Vueish = {
            clearableByDefault: setting.hasOwnProperty('clearableByDefault')
                ? setting.clearableByDefault
                : defaultSettings.clearableByDefault,
            icons: Object.assign({}, defaultSettings.icons, setting.icons ?? {})
        } as Settings;

        if (globalThis.document && getComputedStyle(document.body).position !== 'relative') {
            document.body.style.position = 'relative';
        }

        // UIRadioGroup needs to have access to it's mounted subcomponents, so it can't be an async component
        app.component('UIRadio', uIRadioImport[Object.keys(uIRadioImport)[0]].default as DefineComponent);

        Object.keys(componentModules).forEach(path => {
            const component = defineAsyncComponent(async () => componentModules[path]());

            // eslint ensures the component named the same as the file
            app.component(getName(path), component);
        });

        app.directive('tooltip', tooltip);
        app.directive('intersect', intersect);
        app.directive('clickAway', clickAway);
        app.directive('outer-html', outerHtml);
    }
} as Plugin;

export function getVersion(): string {
    return __VUEISH_VERSION__;
}
