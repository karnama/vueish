let consoleWarnMock: jest.SpyInstance;

/**
 * Disable console warnings.
 */
export function disableConsoleWarn(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
}

/**
 * Enable showing console warnings.
 */
export function enableConsoleWarn(): void {
    if (consoleWarnMock) {
        consoleWarnMock.mockRestore();
    }
}
