export type Icon = 'clear' | 'tick' | 'dash' | 'lock' | 'chevron' | 'menu';

export type Settings = {
    icons: Record<Icon, string>;
};

export * from './components';

export const styleTypes = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'brand'] as const;
export type StyleType = typeof styleTypes[number];
