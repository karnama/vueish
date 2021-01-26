import type { App } from '@vue/runtime-core';
import * as Components from './components/index';

export default {
    install: (Vue: App): void => {
        Object.values(Components).forEach(component =>
            Vue.component(component.name, component)
        );
    }
};
