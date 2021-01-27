import type { App } from '@vue/runtime-core';
import components from './components';

export default {
    install: (Vue: App): void => {
        Object.values(components).forEach((component) =>
            Vue.component(component.name, component)
        );
    }
};
