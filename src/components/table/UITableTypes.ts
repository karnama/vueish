export type Row = {
    name: string; // The display value
    isSelectable?: boolean; // whether the row is selectable
    [key: string]: any;
};

export type Column<T = Row> = {
    header?: string;
    rowProperty: string;
    sortable?: boolean;
    sortFunc?: (previousRow: T, nextRow: T) => -1 | 0 | 1;
};
