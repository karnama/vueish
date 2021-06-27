export type Icon = 'clear' | 'tick' | 'dash' | 'lock' | 'chevron' | 'person' | 'upload';

export type Settings = {
    /**
     * Whether the inputs should be clearable by default.
     */
    clearableByDefault: boolean;

    /**
     * The icons to use in the components.
     */
    icons: Record<Icon, string>;
};

export * from './components';
export * from './directives';

export const styleTypes = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'brand'] as const;
export type StyleType = typeof styleTypes[number];

export interface UIError {
    message: string;
}
