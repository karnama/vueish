import type { StyleType, UIError } from '../';

// UIBadge
export const horizontal = ['left', 'middle', 'right'] as const;
export const vertical = ['top', 'middle', 'bottom'] as const;

// UIButtonToggle
export type Option = {
    label?: string; // label to use if no slot set
    value: any;
    slot?: string; // name of the slot to use for this option
    category?: StyleType;
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
    isSelectable?: boolean; // whether the row is selectable
    [key: string]: any;
}
export interface Column<T = Row> {
    header?: string;
    rowProperty: Exclude<keyof Omit<T, 'isSelectable'>, number> | string;
    suffix?: string | ((row: T) => string | undefined);
    prefix?: string | ((row: T) => string | undefined);
    sortable?: boolean;
    sortByFunc?: SortByFunc<T>;
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
    isOpen: boolean;
}
