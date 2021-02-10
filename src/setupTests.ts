import { config } from '@vue/test-utils';
import defaultSettings from '@/defaultSettings';

beforeAll(() => {
    // VTU is currently a bit lame and just takes your config at face value
    config.global = {
        config: {
            globalProperties: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Vueish: defaultSettings
            }
        },
        stubs: {
            transition: true,
            'transition-group': true
        },
        provide: {},
        components: {},
        directives: {},
        mixins: [],
        mocks: {},
        plugins: [],
        renderStubDefaultSlot: false
    };
});
