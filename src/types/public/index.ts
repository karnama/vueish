export type Icon = 'clear' | 'tick' | 'dash' | 'lock';

export type Settings = {
    icons: Record<Icon, string>;
};

export * from './components';
