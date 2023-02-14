import type { Theme, UIError } from '../';

// UIBadge
export const horizontal = ['left', 'middle', 'right'] as const;
export const vertical = ['top', 'middle', 'bottom'] as const;

// UIButtonToggle
export type Option = {
    /**
     * Label to use if no slot set
     */
    label?: string;
    value: any;
    /**
     * Name of the slot to use for this option
     */
    slot?: string;
    theme?: Theme;
};

// UIAvatar
export interface Avatar {
    src?: string;
    alt?: string;
    content?: string;
    squared?: boolean;
}

// UITable
export interface Row {
    /**
     * Whether the row is selectable or not
     */
    isSelectable?: boolean;

    /**
     * Property of the row.
     */
    [key: string]: any;
}
export interface Column<T extends Record<PropertyKey, any> = Record<PropertyKey, any>> {
    header?: string;
    rowProperty: Exclude<keyof T, number | symbol> | string;
    suffix?: string | ((row: T & Row) => string | undefined);
    prefix?: string | ((row: T & Row) => string | undefined);
    sortable?: boolean;
    sortByFunc?: SortByFunc<T & Row>;
}
export interface SortOrder {
    column: string;
    sortByFunc?: SortByFunc<Row>;
    direction: 'asc' | 'desc';
}
type SortByFunc<T> = (row: T) => any;

// UIFileUploader
export interface FileError extends UIError {
    files: File[];
}

// UIModal
export interface UIModal {
    open: () => Promise<void>;
    close: (event: 'accept' | 'cancel') => Promise<void>;
    confirm: () => Promise<boolean>;
    isOpen: Readonly<boolean>;
}

// UIDropdown
export interface UIDropdown {
    show: () => void;
    hide: () => void;
    toggle: () => void;
}
