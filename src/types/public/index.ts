export type Icon = 'clear' | 'tick' | 'dash' | 'lock' | 'chevron';

export type Settings = {
    icons: Record<Icon, string>;
};

export const styleTypes = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'brand'] as const;
export type StyleType = typeof styleTypes[number];


