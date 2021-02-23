export type Row = {
    name: string; // The display value
    isSelectable?: boolean; // whether the row is selectable
    [key: string]: any;
};

export type Column<T = Row> = {
    header?: string;
    rowProperty: string;
    suffix?: string;
    prefix?: string;
    sortable?: boolean;
    sortFunc?: SortFunc<T>;
};

export type SortOrder = {
    column: string;
    sortFunc?: SortFunc<Row>;
    direction: Direction;
}[];

type Direction = 'asc' | 'desc';
type SortFunc<T> = (row: T, direction: Direction) => any;
