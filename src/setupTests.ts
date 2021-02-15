import { config } from '@vue/test-utils';
import defaultSettings from '@/defaultSettings';

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
