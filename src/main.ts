import type { App, Plugin } from '@vue/runtime-core';
import type { DeepPartial } from 'types/utilities';
import type { Settings } from 'types';
import { merge } from 'lodash-es';
import defaultSettings from './defaultSettings';
import tooltip from './directives/tooltip';
import intersect from './directives/intersect';
import outerHtml from './directives/outer-html';
import clickAway from './directives/click-away';
import './assets/styles/main.scss';
import { defineAsyncComponent } from 'vue';

const componentModules = import.meta.glob('./**/UI*.vue');

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
        app.config.globalProperties.Vueish = merge(defaultSettings, setting);

        if (document && getComputedStyle(document.body).position !== 'relative') {
            document.body.style.position = 'relative';
        }

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
