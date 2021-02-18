<template>
    <table class="flex sm:table flex-nowrap border-collapse overflow-y-scroll
                  shadow-md bg-white w-full table-auto text-gray-700 border-b">
        <thead>
            <tr class="hidden sm:table-row">
                <th v-for="column in normalisedHeaders"
                    :key="column.rowProperty"
                    class="py-6 text-left px-4">
                    <slot name="header" :header="column">
                        {{ column.header }}
                    </slot>
                </th>
            </tr>
        </thead>

        <tbody class="space-y-5 sm:space-y-0 w-full">
            <template v-for="row in rows" :key="row.name">
                <slot name="row"
                      :row="row"
                      :headers="normalisedHeaders"
                      :hover-highlight="hoverHighlight">
                    <UITableRow :row="row" :headers="normalisedHeaders" :hover-highlight="hoverHighlight" />
                </slot>
            </template>
        </tbody>
    </table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Column, Row } from '@components/table/UITableTypes';
import { snakeCase } from 'lodash-es';
import UITableRow from './UITableRow.vue';

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
    components: { UITableRow },
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
            default:false
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
        const rowProperties = computed<string[]>(() =>  normalisedHeaders.value.map(header => header.rowProperty));

        return {
            normalisedHeaders,
            rowProperties
        };
    }
});
</script>
