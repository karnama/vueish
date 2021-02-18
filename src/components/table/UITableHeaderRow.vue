<template>
    <tr>
        <td v-for="column in headers"
            :key="column.rowProperty">
            <slot name="header" :header="column">
                {{ column.header }}
            </slot>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Column } from '@components/table/UITableTypes';

export default defineComponent({
    name: 'UITableHeaderRow',

    props: {
        /**
         * The column headers of the table.
         */
        headers: {
            type: Array as PropType<Required<Column>[]>,
            required: true
        }
    }
});
</script>

<style scoped lang="scss">

</style>
