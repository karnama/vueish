import { config } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import defaultSettings from '@/defaultSettings';
import type { ComponentPublicInstance } from 'vue';

beforeAll(() => {
    if (process.env.IS_CI) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        config.global.config.warnHandler = () => {};
    }
    config.global.config.globalProperties = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Vueish: defaultSettings
    };
});

const lastEventPlugin = (wrapper: VueWrapper<ComponentPublicInstance>) => {
    return {
        lastEventValue<T>(eventName = 'update:modelValue'): T | undefined  {
            const events = wrapper.emitted(eventName);

            return events ? events[events.length - 1] as T : undefined;
        }
    };
};

config.plugins.VueWrapper.install(lastEventPlugin);

declare module '@vue/test-utils' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface VueWrapper<T extends ComponentPublicInstance> {
        /**
         * Return the last event value if any that has occurred.
         *
         * @param {string=} eventName
         */
        lastEventValue<R extends unknown>(eventName?: string): R | undefined;
    }
}
