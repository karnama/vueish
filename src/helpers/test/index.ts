import defaultSettings from '@/defaultSettings';
import { GlobalMountOptions } from '@vue/test-utils/dist/types';

let consoleWarnMock: jest.SpyInstance;

export function disableConsoleWarn(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
}

export function enableConsoleWarn(): void {
    if (consoleWarnMock) {
        consoleWarnMock.mockRestore();
    }
}

export const global: GlobalMountOptions = {
    config: {
        globalProperties: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Vueish: defaultSettings
        }
    }
};
