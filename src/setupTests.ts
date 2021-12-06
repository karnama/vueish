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

    const style = document.createElement('style');
    document.head.appendChild(style);

    // tw classes controlling what's visible
    style.sheet!.insertRule('.opacity-0 { opacity: 0; }');
    style.sheet!.insertRule('.hidden { display: none; }');
    style.sheet!.insertRule('.invisible { visibility: hidden; }');
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
        lastEventValue<R>(eventName?: string): R | undefined;
    }
}
