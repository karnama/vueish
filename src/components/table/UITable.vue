<template>
    <table class="flex sm:table flex-nowrap border-collapse border border-gray-200 overflow-y-scroll
                  shadow-md bg-white w-full table-auto text-gray-700 rounded">
        <thead>
            <tr class="hidden sm:table-row bg-gray-100">
                <th v-for="column in normalisedHeaders"
                    :key="column.rowProperty"
                    class="py-6 text-left px-4 uppercase font-light text-gray-500 text-sm">
                    <slot name="header" :header="column">
                        {{ column.header }}
                    </slot>
                </th>
            </tr>
        </thead>

        <tbody class="space-y-5 sm:space-y-0 w-full">
            <tr v-for="row in rows"
                :key="row.name"
                class="flex flex-col flex-no-wrap sm:table-row border-t border-gray-200">
                <td v-for="name in rowProperties"
                    :key="name"
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
        </tbody>
    </table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Column, Row } from '@components/table/UITableTypes';
import { snakeCase } from 'lodash-es';

// todo - features planned/would be nice to have
// - column/row highlight on hover of headers - https://css-tricks.com/simple-css-row-column-highlighting/
// - fixed header on scroll
// - sorting -> multi sorting?
// - row selection - v-model
// - search
// - pagination
// - dropdown extra info
// - virtualized

export default defineComponent({
    name: 'UITable',

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
        }
    },

    setup(props) {
        // const validateRows = (rows: Row[]): boolean => {
        //     const properties = props.headers.map(header => header.rowProperty);
        //     return rows.every(row => Object.keys(row).every(key => key in properties));
        // };

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
        const getHeader = (rowProperty: string): string => {
            return normalisedHeaders.value.find(header => header.rowProperty === rowProperty).header;
        };

        return {
            normalisedHeaders,
            rowProperties,
            getHeader
        };
    }
});
</script>

<style scoped lang="scss">
.content {
    min-height: 40px;
    width: 140px;
}
</style>
