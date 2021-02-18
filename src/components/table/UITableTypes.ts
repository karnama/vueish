export type Row = {
    name: string;
    [key: string]: any;
};

export type Column<T = Row> = {
    header?: string;
    rowProperty: string;
    sortable?: boolean;
    sortFunc?: (previousRow: T, nextRow: T) => -1 | 0 | 1;
};
