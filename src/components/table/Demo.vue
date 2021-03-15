<template>
    <UIPanel closed class="bg-white mb-4">
        <template #header>
            Table with slots
        </template>
        <UITable :headers="headers"
                 :rows="rows"
                 hover-highlight
                 :items-per-page="Number(2)">
            <template #header="slotProps">
                slotted {{ slotProps.header.rowProperty }}
            </template>
            <template #name="slotProps">
                slotted change of {{ slotProps.row.name }}
            </template>
            <template #action>
                <UIButton type="brand">
                    CTA
                </UIButton>
            </template>
            <template #footer>
                <span class="font-bold text-gray-700">Slotted footer</span>
            </template>
        </UITable>
    </UIPanel>

    Searchable
    <UITable :headers="headers"
             :rows="rows"
             search
             disable-sorting />

    With Selection
    <UITable v-model="selectedRows"
             :headers="headers"
             :rows="rows"
             selectable
             :items-per-page="Number(2)"
             disable-sorting />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UITable from '@components/table/UITable.vue';
import { Column, Row } from '@components/table/UITableTypes';
import UIPanel from '@components/panel/UIPanel.vue';
import UIButton from '@components/button/UIButton.vue';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Table',
    components: { UIButton, UIPanel, UITable },
    setup() {
        const headers = ref<Column[]>([
            { header: 'Dessert (100g serving)', rowProperty: 'name' },
            { header: 'Calories', rowProperty: 'calories' },
            { header: 'Fat (g)', rowProperty: 'fat' },
            { header: 'Carbs (g)', rowProperty: 'carbs', sortable: true },
            { header: 'Protein (g)', rowProperty: 'protein' },
            { header: 'Iron (%)', rowProperty: 'iron', suffix: '%', sortable: true }
        ]);
        const rows = ref<Row[]>([
            {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: '1'
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: '1'
            },
            {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: '7'
            },
            {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: '8',
                isSelectable: false
            },
            {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: '16'
            },
            {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: '0'
            },
            {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: '2'
            },
            {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: '45'
            },
            {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: '22'
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6'
            }
        ]);
        const selectedRows = ref<Row[]>();
        const page = ref(1);
        const itemsPerPage = ref(2);

        return {
            headers,
            rows,
            selectedRows,
            page,
            itemsPerPage
        };
    }
});
</script>
