export interface Row {
    isSelectable?: boolean; // whether the row is selectable
    [key: string]: any;
}

export interface Column<T = Row> {
    header?: string;
    rowProperty: string;
    suffix?: string;
    prefix?: string;
    sortable?: boolean;
    sortByFunc?: SortByFunc<T>;
}

export interface SortOrder {
    column: string;
    sortByFunc?: SortByFunc<Row>;
    direction: 'asc' | 'desc';
}

type SortByFunc<T> = (row: T) => any;
