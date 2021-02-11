import { config } from '@vue/test-utils';
import defaultSettings from '@/defaultSettings';

beforeAll(() => {
    config.global.config.globalProperties = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Vueish: defaultSettings
    };
});
