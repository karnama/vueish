<template>
    <tr class="flex flex-col flex-no-wrap sm:table-row border-t">
        <td v-for="name in propertyNames"
            :key="name"
            class="flex flex-row flex-nowrap items-center p-0 sm:table-cell">
            <span role="rowheader" class="block sm:hidden content font-bold py-2 flex-none">
                {{ getHeader(name) }}
            </span>
            <span class="block p-4">{{ row[name] }}</span>
        </td>
    </tr>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Column, Row } from '@components/table/UITableTypes';

export default defineComponent({
    name: 'UITableRow',
    props: {
        /**
         * The complete row object
         */
        row: {
            type: Object as PropType<Row>,
            required: true
        },

        /**
         * The column headers of the table.
         */
        headers: {
            type: Array as PropType<Required<Column>[]>,
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
        const propertyNames = computed(() => Object.keys(props.row));
        const getHeader = (rowProperty: string): string => {
            return props.headers.find(header => header.rowProperty === rowProperty).header;
        };

        return {
            propertyNames,
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
.fit-width {
    width: 1px;
    white-space: nowrap;
}
</style>
