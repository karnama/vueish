<template>
    <section class="shadow-md dark:shadow-lg text-color bg-white dark:bg-gray-600 relative sm:overflow-x-scroll">
        <table class="flex sm:table flex-col border-collapse border-gray-200
                      w-full table-auto rounded relative"
               :class="[hoverClass]"
               @mouseover="handleHover"
               @mouseleave="handleHover">
            <thead class="sticky top-0 bg-white dark:bg-gray-700 shadow dark:shadow-lg z-10">
                <tr v-if="!!search" class="block sm:table-row">
                    <th :colspan=" normalisedHeaders.length + ($slots.action ? 1 : 0) + (selectable ? 1 : 0)"
                        class="px-4 py-8 block sm:table-cell">
                        <span class="block">
                            <UIInput v-model="term" name="search" placeholder="Search..." />
                        </span>
                    </th>
                </tr>

                <tr class="hidden sm:table-row bg-gray-100 dark:bg-gray-700">
                    <th v-if="selectable" class="py-6 px-2">
                        <span v-if="!singleSelect" class="mx-auto">
                            <UICheckbox name="selectAll"
                                        :indeterminate="Array.isArray(selected)
                                            ? selected.length !== selectableRows.length
                                            : true"
                                        :model-value="Array.isArray(selected) && !!selected.length"
                                        @update:model-value="toggleAllRowSelection" />
                        </span>
                    </th>

                    <th v-for="column in normalisedHeaders"
                        :key="column.rowProperty"
                        :class="{
                            'cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500':
                                !disableSorting && column.sortable,
                            'bg-gray-200 dark:bg-gray-600': !!sortDirection(column.rowProperty)
                        }"
                        class="py-6 text-left px-4 uppercase font-light text-color-muted text-sm
                               select-none group transition-colors"
                        @click="sortBy(column.rowProperty)">
                        <span class="flex items-center justify-between">
                            <slot name="header" :header="column">
                                {{ column.header }}
                            </slot>

                            <i v-if="!disableSorting && column.sortable"
                               class="ml-2 transition opacity-0 group-hover:opacity-100"
                               :class="{
                                   'opacity-100': !!sortDirection(column.rowProperty),
                                   'rotate-180': sortDirection(column.rowProperty) === 'desc'
                               }"
                               v-html="chevronIcon" />
                        </span>
                    </th>

                    <th v-if="$slots.action" />
                </tr>
            </thead>

            <tbody class="space-y-5 sm:space-y-0 shadow divide-y">
                <template v-if="pageRows.length">
                    <tr v-for="(row, index) in pageRows"
                        :key="index"
                        :class="{ 'row-highlight': hoverHighlight }"
                        class="flex flex-col flex-no-wrap sm:table-row border-gray-200 dark:border-gray-500">
                        <td v-if="selectable" class="px-2 py-2 sm:py-0">
                            <UICheckbox v-if="row.isSelectable"
                                        :name="String(index)"
                                        class="justify-center"
                                        :model-value="isSelected(row)"
                                        @update:model-value="toggleRowSelection(row)" />
                        </td>

                        <td v-for="name in rowProperties"
                            :key="name"
                            :data-column="name"
                            :class="{
                                [`hover-cell-${name}`]: true,
                                'cell-highlight': hoverHighlight
                            }"
                            :data-sort="sortDir = sortDirection(name)"
                            :data-col="col = getColumn(name)"
                            class="flex flex-row flex-nowrap items-center p-0 sm:table-cell">
                            <span role="rowheader"
                                  class="flex items-center justify-between sm:hidden content font-bold p-4
                                         flex-none transition-colors select-none group"
                                  style="min-height: 40px; width: 140px;"
                                  :class="{
                                      'cursor-pointer hover:bg-gray-300': !disableSorting && col.sortable,
                                      'bg-gray-200': !!sortDir
                                  }"
                                  @click="sortBy(name)">
                                <slot name="header" :header="col">
                                    {{ col.header }}
                                </slot>

                                <i v-if="!disableSorting && col.sortable"
                                   class="ml-2 transition opacity-0 group-hover:opacity-100"
                                   :class="{
                                       'opacity-100': !!sortDir,
                                       'rotate-180': sortDir=== 'desc'
                                   }"
                                   v-html="chevronIcon" />
                            </span>

                            <span class="block p-4">
                                <slot :name="name" :row="row">
                                    {{ col.prefix + (row[name] ?? '') + col.suffix }}
                                </slot>
                            </span>
                        </td>

                        <td v-if="$slots.action" class="p-4">
                            <slot name="action" :row="row" />
                        </td>
                    </tr>
                </template>

                <tr v-else>
                    <td :colspan="selectable ? normalisedHeaders.length + 1 : normalisedHeaders.length">
                        <span class="block text-center px-4 py-6 text-gray-400">
                            <slot name="empty">
                                {{ empty }}
                            </slot>
                        </span>
                    </td>
                </tr>
            </tbody>

            <tfoot v-if="$slots.footer
                       || selectable && !singleSelect
                       || filteredRows.length > itemsPerPage && !disablePagination"
                   class="border-t border-gray-300 dark:border-gray-500 sticky
                          bg-white dark:bg-gray-700 bottom-0 sm:relative shadow-up">
                <tr class="w-full flex sm:table-row">
                    <td class="block grow sm:table-cell"
                        :colspan="normalisedHeaders.length + ($slots.action ? 1 : 0) + (selectable ? 1 : 0)">
                        <span class="flex flex-col sm:flex-row items-center justify-between
                                     flex-wrap break-words px-4 py-6">
                            <slot name="footer" />
                            <span v-if="selectable && !singleSelect" class="block sm:hidden">
                                <UICheckbox name="selectAll"
                                            class="my-2"
                                            label="Select All"
                                            :indeterminate="Array.isArray(selected)
                                                ? selected.length !== selectableRows.length
                                                : true"
                                            :model-value="Array.isArray(selected) && !!selected.length"
                                            @update:model-value="toggleAllRowSelection" />
                            </span>
                            <slot v-if="!disablePagination && filteredRows.length > itemsPerPage"
                                  name="pagination"
                                  v-bind="{
                                      itemsPerPage: currentItemsPerPage,
                                      page: currentPage,
                                      pageCount,
                                      hasNext,
                                      hasPrevious,
                                      jumpToPage
                                  }">
                                <span class="flex items-center justify-end space-x-2 my-2 grow">
                                    <span class="flex items-center">
                                        <span class="mr-2">Items per page</span>
                                        <UISelect name="items-per-page"
                                                  :model-value="{ id: currentItemsPerPage }"
                                                  :options="itemPerPageOptions"
                                                  option-label="id"
                                                  class="mr-2"
                                                  style="min-width: 50px"
                                                  no-search
                                                  no-clear
                                                  label="Items per page"
                                                  header=""
                                                  @update:model-value="(o) => currentItemsPerPage = o.id" />
                                    </span>
                                    <span class="flex justify-end items-center space-x-2">
                                        <UIButton :disabled="!hasPrevious"
                                                  minimal
                                                  class="rotate-90"
                                                  @click="currentPage--"
                                                  v-html="chevronIcon" />
                                        <UIButton :disabled="!hasNext"
                                                  minimal
                                                  class="transform -rotate-90"
                                                  @click="currentPage++"
                                                  v-html="chevronIcon" />
                                    </span>
                                </span>
                            </slot>
                        </span>
                    </td>
                </tr>
            </tfoot>
        </table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Column, Row, SortOrder } from 'types';
import { snakeCase, uniqueId, isEqual, orderBy, cloneDeep } from 'lodash-es';
import UIInput from 'components/input/UIInput.vue';
import UICheckbox from 'components/checkbox/UICheckbox.vue';
import { useVModel } from 'composables/input';
import type { MaybeArray } from 'types/utilities';
import { getIcon } from '@/helpers';
import { debouncedRef } from 'composables/reactivity';
import UISelect from 'components/select/UISelect.vue';
import UIButton from 'components/button/UIButton.vue';

export default defineComponent({
    name: 'UITable',

    components: { UIButton, UISelect, UIInput, UICheckbox },

    props: {
        modelValue: {
            type: [Array, Object] as PropType<MaybeArray<Row>>,
            default: () => []
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
         * Boolean flag to enable or callback that os used for searching.
         */
        search: {
            type: [Boolean, Function] as PropType<boolean | ((row: Row, searchTerm: string) => boolean)>
        },

        /**
         * The string to display if no data provided.
         */
        empty: {
            type: String,
            default: 'There\'s no data available.'
        },

        /**
         * Whether the option to select a row is visible or not.
         */
        selectable: {
            type: Boolean,
            default: false
        },

        /**
         * Only allow selecting single a single row.
         */
        singleSelect: {
            type: Boolean,
            default: false
        },

        /**
         * Whether the columns are sortable or not.
         */
        disableSorting: {
            type: Boolean,
            default: false
        },

        /**
         * The current page.
         */
        page: {
            type: Number,
            default: 1,
            validator: (val: number) => val > 0
        },

        /**
         * The number of rows on the page.
         */
        itemsPerPage: {
            type: Number,
            default: 10,
            validator: (val: number) => [5, 10, 25, 50, 100].includes(val)
        },

        /**
         * Flag used for disabling the pagination.
         */
        disablePagination: {
            type: Boolean,
            default: false
        }
    },

    emits: ['update:modelValue', 'update:page', 'update:itemsPerPage'],

    setup(props) {
        const chevronIcon = getIcon('chevron');
        let styleTagId = '';
        const itemPerPageOptions = [
            { name: 5, id: 5 },
            { name: 10, id: 10 },
            { name: 25, id: 25 },
            { name: 50, id: 50 },
            { name: 100, id: 100 }
        ];

        const normalisedHeaders = computed<Required<Column>[]>(() => {
            return props.headers.map((col: Column) => {
                const header = col.header ?? snakeCase(col.rowProperty) // Title Case
                    .split('_')
                    .reduce((previous: string, next: string) =>
                        previous + ' ' + next.charAt(0).toUpperCase() + next.slice(1));

                return {
                    sortable: false,
                    prefix: '',
                    suffix: '',
                    sortByFunc: null,
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
        const filteredRows = computed(() => {
            const sortedRows = (rows: Required<Row>[]): Required<Row>[] => {
                if (!sortOrder.value.length) return rows;

                return orderBy(
                    rows,
                    sortOrder.value.map(order => {
                        return order.sortByFunc ?? (row => isNaN(Number(row[order.column]))
                            ? row[order.column]
                            : Number(row[order.column]));
                    }),
                    sortOrder.value.map(order => order.direction)
                );
            };

            if (!props.search || !term.value) {
                return sortedRows(normalisedRows.value);
            }

            const search: (row: Row, searchString: string) => boolean = props.search instanceof Function
                ? props.search
                : (row, str) => Object.values(row).some(value => {
                    return typeof value === 'boolean' ? false : new RegExp(str, 'i').test(String(value));
                });

            return sortedRows(normalisedRows.value.filter(row => search(row, term.value)));
        });

        const currentPage = useVModel<number>(props, 'page');
        const currentItemsPerPage = useVModel<number>(props, 'itemsPerPage');
        const pageRows = computed(() => {
            if (props.disablePagination) {
                return filteredRows.value;
            }

            const start = currentItemsPerPage.value * (currentPage.value - 1);

            return filteredRows.value.slice(start, start + currentItemsPerPage.value);
        });
        const pageCount = computed(() => filteredRows.value.length / currentItemsPerPage.value);
        const hasNext = computed(() => {
            return !!filteredRows.value
                .slice((currentPage.value - 1) * currentItemsPerPage.value + currentItemsPerPage.value)
                .length;
        });
        const hasPrevious = computed(() => currentPage.value > 1);

        const term = debouncedRef('');
        const hoverClass = ref('');
        const selected = useVModel<MaybeArray<Row> | null>(props);
        const sortOrder = ref<SortOrder[]>([]);
        const selectableRows = computed(() => normalisedRows.value.filter(r => r.isSelectable));

        const getColumn = (rowProperty: string): Required<Column> | undefined => {
            return normalisedHeaders.value.find(header => header.rowProperty === rowProperty);
        };
        const addHoverStyles = (arg: [Required<Column>[], boolean]) => {
            const [headers, hoverHighlight] = arg;
            if (!styleTagId) {
                if (!hoverHighlight) {
                    return;
                } else {
                    styleTagId = uniqueId('style_');
                }
            }

            let style = document.getElementById(styleTagId) as HTMLStyleElement;

            if (!hoverHighlight) {
                style?.parentElement?.removeChild(style);
                return;
            }

            if (!style) {
                style = document.createElement('style');
                style.type = 'text/css';
                style.id = styleTagId;
                document.head.appendChild(style);
            }

            if (style.sheet!.cssRules.length) {
                for (let i = 0; i < style.sheet!.cssRules.length; i++) {
                    style.sheet!.deleteRule(i);
                }
            }

            headers.forEach(header => {
                style.sheet!.insertRule(
                    `@media (min-width: 640px) {
                        table.hover-cell-${header.rowProperty}:hover td.hover-cell-${header.rowProperty} {
                            background-color: rgba(var(--color-brand-50), var(--tw-bg-opacity, 1));
                        }

                        .dark table.hover-cell-${header.rowProperty}:hover td.hover-cell-${header.rowProperty} {
                            background-color: rgba(var(--color-brand-400), var(--tw-bg-opacity, 1));
                        }
                    }`
                );
            });
        };
        const handleHover = (event: MouseEvent): void => {
            if (!props.hoverHighlight) return;

            const td = (event.target as Element).closest('td') as HTMLTableCellElement;

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
        const isSelected = (row: Required<Row>): boolean => {
            const selection = Array.isArray(selected.value) ? selected.value : [selected.value];
            return !!selection.find(selectedRow => isEqual(selectedRow, row));
        };
        const toggleRowSelection = (row: Required<Row>): void => {
            if (!row.isSelectable) return;

            if (props.singleSelect) {
                selected.value = isEqual(selected.value, row) ? null : row;
                return;
            }

            let selection: Row[] = Array.isArray(selected.value)
                ? cloneDeep(selected.value)
                : selected.value ? [cloneDeep(selected.value)] : [];

            const rowIndex = selection.findIndex(selectedRow => isEqual(selectedRow, row));
            rowIndex === -1 ? selection.push(row) : selection.splice(rowIndex, 1);

            selected.value = selection;
            return;
        };
        const toggleAllRowSelection = () => {
            selected.value = Array.isArray(selected.value)
                ? selected.value.length ? [] : filteredRows.value.filter(row => row.isSelectable)
                : filteredRows.value.filter(row => row.isSelectable);
        };
        const sortBy = (columnName: string): void => {
            if (props.disableSorting
                || !normalisedHeaders.value.find(header => header.rowProperty === columnName)?.sortable
            ) {
                return;
            }

            const existingOrdering = sortOrder.value.findIndex(colOrder => colOrder.column === columnName);

            if (existingOrdering === -1) {
                sortOrder.value.push({
                    column: columnName,
                    direction: 'asc',
                    sortByFunc: getColumn(columnName)?.sortByFunc
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
        const jumpToPage = (input: string | number) => {
            input = Number(input);
            if (isNaN(input) || !Number.isInteger(input) || input < 1 || input > pageCount.value) return;

            currentPage.value = input;
        };

        watch(
            [() => normalisedHeaders.value, () => props.hoverHighlight],
            val => addHoverStyles(val),
            { immediate: true }
        );

        return {
            currentItemsPerPage,
            itemPerPageOptions,
            normalisedHeaders,
            normalisedRows,
            selectableRows,
            rowProperties,
            filteredRows,
            chevronIcon,
            hasPrevious,
            currentPage,
            hoverClass,
            pageCount,
            selected,
            pageRows,
            hasNext,
            term,
            sortBy,
            getColumn,
            isSelected,
            jumpToPage,
            handleHover,
            sortDirection,
            toggleRowSelection,
            toggleAllRowSelection
        };
    }
});
</script>

<style lang="scss">
.shadow {
    --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-up {
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06);
}

@screen sm {
    .row-highlight:hover {
        @apply bg-brand-50;
    }

    .cell-highlight:hover {
        background-color: rgba(var(--color-brand-200), var(--tw-bg-opacity, 1)) !important;
    }

    .dark {
        & .row-highlight:hover {
            @apply bg-brand-400;
        }

        & .cell-highlight:hover {
            background-color: rgba(var(--color-brand-600), var(--tw-bg-opacity, 1)) !important;
        }
    }
}
</style>
