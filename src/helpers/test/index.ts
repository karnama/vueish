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
