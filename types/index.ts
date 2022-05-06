import './vueish.d.ts';

export type Icon = 'clear' | 'check' | 'dash' | 'lock' | 'chevron' | 'person' | 'upload' | 'show' | 'hide' | 'retry';

export type Settings = {
    /**
     * Whether the inputs should be clearable by default.
     *
     * @default false;
     */
    clearableByDefault: boolean;

    /**
     * The icons to use in the components.
     */
    icons: Record<Icon, string>;
};

export * from './components';
export * from './directives';

export const themes = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'red', 'brand', 'default'] as const;
export type Theme = typeof themes[number];

export interface UIError {
    message: string;
}
