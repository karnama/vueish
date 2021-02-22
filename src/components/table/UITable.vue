<template>
    <section class="shadow-md text-gray-700 bg-white">
        <table class="flex sm:table flex-col border-collapse border-gray-200 sm:overflow-x-scroll
                      w-full table-auto rounded relative"
               :class="[hoverClass]"
               @mouseover="handleHover"
               @mouseleave="handleHover">
            <thead class="sticky top-0 shadow">
                <tr v-if="!!search" class="bg-white block sm:table-row">
                    <th :colspan=" normalisedHeaders.length" class="px-4 py-8 block sm:table-cell">
                        <span class="block">
                            <UIText name="search" placeholder="Search..." @update:model-value="setTerm" />
                        </span>
                    </th>
                </tr>

                <tr class="hidden sm:table-row bg-gray-100">
                    <th v-if="showSelect" class="py-6 px-2">
                        <span v-if="multiSelect" class="mx-auto">
                            <UICheckbox name="selectAll"
                                        classes="justify-center"
                                        :indeterminate="selected.length !== rows.length"
                                        :model-value="!!selected.length"
                                        @update:model-value="toggleFilteredSelection" />
                        </span>
                    </th>

                    <th v-for="column in normalisedHeaders"
                        :key="column.rowProperty"
                        :class="{
                            'cursor-pointer hover:bg-gray-50': !noSort && column.sortable,
                            'bg-gray-200': !!sortDirection(column.rowProperty)
                        }"
                        class="py-6 text-left px-4 uppercase font-light
                               text-gray-500 text-sm select-none group transition"
                        @click="sortBy(column.rowProperty)">
                        <span class="flex items-center justify-between">
                            <slot name="header" :header="column">
                                {{ column.header }}
                            </slot>

                            <i v-if="!noSort && column.sortable"
                               class="ml-2 transition transform opacity-0 group-hover:opacity-100"
                               :class="{
                                   'opacity-100': !!sortDirection(column.rowProperty),
                                   'rotate-180': sortDirection(column.rowProperty) === 'desc'
                               }"
                               v-html="chevronIcon" />
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody class="space-y-5 sm:space-y-0">
                <template v-if="filteredRows.length">
                    <tr v-for="row in filteredRows"
                        :key="row.name"
                        :class="{ 'row-highlight': hoverHighlight }"
                        class="flex flex-col flex-no-wrap sm:table-row border-t border-gray-200">
                        <td v-if="showSelect" class="px-2">
                            <UICheckbox :name="row.name"
                                        :disabled="!row.isSelectable"
                                        classes="justify-center"
                                        :model-value="isSelected(row)"
                                        @update:model-value="toggleRowSelection(row)" />
                        </td>

                        <td v-for="name in rowProperties"
                            :key="name"
                            :data-column="name"
                            :class="{ [`hover-cell-${name}`]: true, 'cell-highlight': hoverHighlight }"
                            class="flex flex-row flex-nowrap items-center p-0 sm:table-cell">
                            <span role="rowheader" class="block sm:hidden content font-bold p-4 flex-none">
                                {{ getHeader(name) }}
                            </span>
                            <span class="block p-4">
                                <slot :name="name" :row="row">
                                    {{ row[name] }}
                                </slot>
                            </span>
                        </td>
                    </tr>
                </template>

                <tr v-else>
                    <td :colspan="showSelect ? normalisedHeaders.length + 1 : normalisedHeaders.length">
                        <span class="block text-center px-4 py-6 text-gray-400">
                            <slot name="empty">
                                {{ empty }}
                            </slot>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <footer class="px-4 py-6 bg-white border-t border-gray-300">
            <slot name="footer" />
        </footer>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Column, Row, SortOrder } from '@components/table/UITableTypes';
import { snakeCase, debounce, uniqueId, isEqual, orderBy } from 'lodash-es';
import UIText from '@components/text/UIText.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';
import { useVModel } from '@composables/input';
import type { MaybeArray } from '@/types';
import { getIcon } from '@/helpers';

// todo - features planned/would be nice to have
// - pagination (mind the selection to also select things not on page)
// - dropdown extra info
// - virtualized

// todo - multi sort
// todo - check what's up with the mobile view
const debounced = debounce((term: Ref, value: string) => term.value = value, 200);
let styleTagId = '';

export default defineComponent({
    name: 'UITable',

    components: { UIText, UICheckbox },

    props: {
        modelValue: {
            type: [Array, Object] as PropType<MaybeArray<Row>>
        },

        /**
         * The rows of the table.
         */
        rows: {
            type: Array as PropType<Row[]>,
            required: true
        },

        /**
         * The column headers of the table.
         */
        headers: {
            type: Array as PropType<Column[]>,
            required: true
        },

        /**
         * Flag indicating whether columns and rows should be highlighted on hover.
         */
        hoverHighlight: {
            type: Boolean,
            default: false
        },

        /**
         * Boolean flag or callback used on the row.
         */
        search: {
            type: [Boolean, Function] as PropType<boolean | ((row: Row) => boolean)>
        },

        /**
         * The string to display if no data provided.
         */
        empty: {
            type: String,
            default: 'There\'s no data available'
        },

        /**
         * Whether rows are selectable or not.
         */
        showSelect: {
            type: Boolean,
            default: false
        },

        /**
         * Whether multiple rows can be selected or not.
         */
        multiSelect: {
            type: Boolean,
            default: false
        },

        /**
         * Whether the columns are sortable or not.
         */
        noSort: {
            type: Boolean,
            default: false
        }
    },

    emits: ['update:modelValue'],

    setup(props) {
        // const validateRows = (rows: Row[]): boolean => {
        //     const properties = props.headers.map(header => header.rowProperty);
        //     return rows.every(row => Object.keys(row).every(key => key in properties));
        // };
        const chevronIcon = getIcon('chevron');

        const normalisedHeaders = computed<Required<Column>[]>(() => {
            return props.headers.map((col: Column) => {
                const header = col.header ?? snakeCase(col.rowProperty) // Title Case
                    .split('_')
                    .reduce((previous: string, next: string) =>
                        previous + ' ' + next.charAt(0).toUpperCase() + next.slice(1));

                return {
                    sortable: false,
                    ...col,
                    header
                } as Required<Column>;
            });
        });
        const normalisedRows = computed<Required<Row>[]>(() => {
            return props.rows.map(row => {
                const isSelectable = typeof row.isSelectable === 'boolean' ? row.isSelectable : true;
                return {
                    ...row,
                    isSelectable
                };
            });
        });
        const rowProperties = computed<string[]>(() => normalisedHeaders.value.map(header => header.rowProperty));
        const term = ref('');
        const filteredRows = computed<Row[]>(() => {
            const sortedRows = (rows: Row[]) => {
                if (!sortOrder.value.length) return rows;

                return orderBy(
                    rows,
                    sortOrder.value.map(order =>
                        row => isNaN(Number(row[order.column])) ? Number(row[order.column]) : row[order.column]
                    ),
                    sortOrder.value.map(order => order.direction)
                );
            };

            if (!props.search || !term.value) {
                return sortedRows(normalisedRows.value);
            }

            const search: (row: Row) => boolean = props.search instanceof Function
                ? props.search
                : (row) => Object.values(row).some(val => String(val).toLowerCase().includes(term.value.toLowerCase()));

            return sortedRows(normalisedRows.value.filter(row => search(row)));
        });
        const hoverClass = ref('');
        const selected = useVModel<MaybeArray<Row>>(props);
        const sortOrder = ref<SortOrder>([]);

        const setTerm = (value: string): void => {
            if (!value) {
                term.value = '';
                debounced.cancel();
                return;
            }

            debounced(term, value);
        };
        const getHeader = (rowProperty: string): string => {
            return normalisedHeaders.value.find(header => header.rowProperty === rowProperty)!.header;
        };
        const addHoverStyles = (arg) => {
            const [headers, hoverHighlight]: [Required<Column>[], boolean] = arg;
            if (!styleTagId) {
                if (!hoverHighlight) {
                    return;
                } else {
                    styleTagId = uniqueId('style_');
                }
            }

            let style: HTMLStyleElement = document.getElementById(styleTagId);

            if (!hoverHighlight) {
                style?.parentElement.removeChild(style);
                return;
            }

            if (!style) {
                style = document.createElement('style');
                style.type = 'text/css';
                style.id = styleTagId;
                document.head.appendChild(style);
            }

            if (style.sheet.cssRules.length) {
                for (let i = 0; i < style.sheet.cssRules.length; i++) {
                    style.sheet.deleteRule(i);
                }
            }

            headers.forEach(header => {
                // todo - get the resolved sm value from tailwind
                style.sheet.insertRule(
                    '@media (min-width: 640px) {'
                    + `table.hover-cell-${header.rowProperty}:hover td.hover-cell-${header.rowProperty} `
                    + '{ background-color: rgba(var(--color-brand-50), var(--tw-bg-opacity, 1)); }}'
                );
            });
        };
        const handleHover = (event: MouseEvent): void => {
            if (!props.hoverHighlight) return;

            const td: HTMLTableCellElement = (event.target as Element).closest('td');

            if (!td) {
                hoverClass.value = '';
                return;
            }

            const name = td.getAttribute('data-column');

            if (!name) {
                return;
            }

            hoverClass.value = `hover-cell-${name}`;
        };
        const isSelected = (row: Row): boolean => {
            const selection = Array.isArray(selected.value) ? selected.value : [selected.value];
            return !!selection.find(selectedRow => isEqual(selectedRow, row));
        };
        const toggleRowSelection = (row: Row): void => {
            if (!row.isSelectable) return;

            if (!props.multiSelect) {
                selected.value = row;
                return;
            }

            let selection = Array.isArray(selected.value) ? selected.value : [selected.value];
            const rowIndex = selection.findIndex(selectedRow => isEqual(selectedRow, row));
            rowIndex === -1 ? selection.push(row) : selection.splice(rowIndex, 1);

            selected.value = selection;
            return;
        };
        const toggleFilteredSelection = () => {
            selected.value = selected.value.length ? [] : filteredRows.value;
        };
        const sortBy = (columnName: string): void => {
            if (props.noSort|| !normalisedHeaders.value.find(header => header.rowProperty === columnName).sortable) {
                return;
            }

            const existingOrdering = sortOrder.value.findIndex(colOrder => colOrder.column === columnName);

            if (existingOrdering === -1) {
                sortOrder.value.push({
                    column: columnName,
                    direction: 'asc'
                });
                return;
            }

            if (sortOrder.value[existingOrdering].direction === 'asc') {
                sortOrder.value[existingOrdering].direction = 'desc';
                return;
            }

            sortOrder.value.splice(existingOrdering, 1);
        };
        const sortDirection = (columnName: string): undefined | 'asc' | 'desc' => {
            return sortOrder.value.find(colOrder => colOrder.column === columnName)?.direction;
        };

        watch(
            [() => normalisedHeaders.value, () => props.hoverHighlight],
            val => addHoverStyles(val),
            { immediate: true }
        );

        return {
            normalisedHeaders,
            normalisedRows,
            rowProperties,
            filteredRows,
            hoverClass,
            selected,
            chevronIcon,
            setTerm,
            getHeader,
            handleHover,
            toggleRowSelection,
            isSelected,
            toggleFilteredSelection,
            sortBy,
            sortDirection
        };
    }
});
</script>

<style scoped lang="scss">
.content {
    min-height: 40px;
    width: 140px;
}

@screen sm {
    .row-highlight:hover {
        @apply bg-brand-50;
    }

    .cell-highlight:hover {
        background-color: rgba(var(--color-brand-200), var(--tw-bg-opacity, 1)) !important;
    }
}
</style>
