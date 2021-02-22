export type Row = {
    name: string; // The display value
    isSelectable?: boolean; // whether the row is selectable
    [key: string]: any;
};

export type Column<T = Row> = {
    header?: string;
    rowProperty: string;
    suffix?: string; // todo - implement this?
    prefix?: string; // todo - implement this?
    sortable?: boolean;
    sortFunc?: (previousRow: T, nextRow: T, direction: Direction) => -1 | 0 | 1;
};

export type SortOrder = {
    column: string;
    direction: Direction;
}[];

type Direction = 'asc' | 'desc';
