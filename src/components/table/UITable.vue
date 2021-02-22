<template>
    <table class="flex sm:table flex-col border-collapse border border-gray-200 overflow-x-scroll
                  shadow-md bg-white w-full table-auto text-gray-700 rounded relative">
        <thead class="sticky top-0">
            <tr v-if="!!search" class="bg-white block sm:table-row">
                <th :colspan=" normalisedHeaders.length" class="px-4 py-8 block sm:table-cell">
                    <span class="block">
                        <UIText name="search" placeholder="Search..." @update:model-value="setTerm" />
                    </span>
                </th>
            </tr>

            <tr class="hidden sm:table-row bg-gray-100">
                <th v-for="column in normalisedHeaders"
                    :key="column.rowProperty"
                    class="py-6 text-left px-4 uppercase font-light text-gray-500 text-sm select-none"
                    @dblclick="toggleHighlight(column.rowProperty)">
                    <slot name="header" :header="column">
                        {{ column.header }}
                    </slot>
                </th>
            </tr>
        </thead>

        <tbody class="space-y-5 sm:space-y-0">
            <template v-if="filteredRows.length">
                <tr v-for="row in filteredRows"
                    :key="row.name"
                    :class="{ 'row-highlight': hoverHighlight }"
                    class="flex flex-col flex-no-wrap sm:table-row border-t border-gray-200">
                    <td v-for="name in rowProperties"
                        :key="name"
                        :data-column="name"
                        :class="{ 'cell-highlight': hoverHighlight }"
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
                <td :colspan=" normalisedHeaders.length">
                    <span class="block text-center py-6 text-gray-400">
                        <slot name="empty">
                            Nothing to see here...
                        </slot>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, ref} from 'vue';
import type { PropType } from 'vue';
import type { Column, Row } from '@components/table/UITableTypes';
import { snakeCase, debounce } from 'lodash-es';
import UIText from '@components/text/UIText.vue';

// todo - features planned/would be nice to have
// - sorting -> multi sorting?
// - row selection - v-model
// - footer
// - pagination
// - dropdown extra info
// - virtualized

// todo - searching while header in fixed position results in odd behaviour
// todo - header(search) not sticky on mobile view

const debounced = debounce((term: Ref, value: string) => term.value = value, 200);

export default defineComponent({
    name: 'UITable',
    components: { UIText },
    props: {
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
        }
    },

    setup(props) {
        // const validateRows = (rows: Row[]): boolean => {
        //     const properties = props.headers.map(header => header.rowProperty);
        //     return rows.every(row => Object.keys(row).every(key => key in properties));
        // };
        let highlightedColumn = '';

        const normalisedHeaders = computed<Required<Column>[]>(() => {
            return props.headers.map((col: Column) => {
                const header = col.header ?? snakeCase(col.rowProperty) // Title Case
                    .split('_')
                    .reduce((previous: string, next: string) =>
                        previous + ' ' + next.charAt(0).toUpperCase() + next.slice(1));

                return {
                    ...col,
                    header: header
                } as Required<Column>;
            });
        });
        const rowProperties = computed<string[]>(() => normalisedHeaders.value.map(header => header.rowProperty));
        const term = ref('');
        const filteredRows = computed<Row[]>(() => {
            if (!props.search || !term.value) {
                return props.rows;
            }

            const search: (row: Row) => boolean = props.search instanceof Function
                ? props.search
                : (row) => Object.values(row).some(val => String(val).toLowerCase().includes(term.value.toLowerCase()));

            return props.rows.filter(row => search(row));
        });


        const setTerm = (value: string): void => {
            if (!value) {
                term.value = '';
                // eslint-disable-next-line
                debounced.cancel(); // todo - clearing value doesn't work as expected (to reproduce: quickly type "cup" and delete)
                return;
            }

            debounced(term, value);
        };
        const getHeader = (rowProperty: string): string => {
            return normalisedHeaders.value.find(header => header.rowProperty === rowProperty)!.header;
        };
        const toggleHighlight = (name: string) => {
            if (!props.hoverHighlight) return;

            if (highlightedColumn) {
                document.querySelectorAll(`td[data-column="${highlightedColumn}"]`).forEach(td => {
                    td.classList.remove('bg-brand-50');
                });

                if (name === highlightedColumn) {
                    highlightedColumn = '';
                    return;
                }
            }

            document.querySelectorAll(`td[data-column="${name}"]`).forEach(td => {
                td.classList.add('bg-brand-50');
            });
            highlightedColumn = name;
        };

        return {
            normalisedHeaders,
            rowProperties,
            filteredRows,
            setTerm,
            getHeader,
            toggleHighlight
        };
    }
});
</script>

<style scoped lang="scss">
.content {
    min-height: 40px;
    width: 140px;
}
// hack to save the value in the dom
//tbody:after {
//    content: '';
//    @apply bg-brand-50 w-0 h-0;
//}
//@screen sm {
//    table {
//        overflow: hidden;
//    }
//    td {
//        position: relative;
//    }
//    td:hover::after {
//            @apply bg-brand-100 opacity-40;
//            content: '\00a0';
//            height: 10000px;
//            left: 0;
//            position: absolute;
//            top: -5000px;
//            width: 100%;
//            z-index: 2;
//            //content: '';
//            //top: 0;
//            //left: 0;
//            //width: 100%;
//            //position: absolute;
//            //height: 100%;
//            //@apply bg-brand-50;
//            //z-index: -1;
//    }
//}
//td[data-column-name="name"] { background-color: var(--color-brand-50); }
.row-highlight:hover {
    @apply bg-brand-50;
}
.cell-highlight:hover {
    @apply bg-brand-200;
}
</style>
