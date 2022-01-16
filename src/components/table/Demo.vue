<template>
    <div class="space-y-4">
        <UIPanel closed header="Table with slots">
            <UITable :headers="headers"
                     :rows="rows"
                     hover-highlight
                     :items-per-page="Number(5)">
                <template #header="slotProps">
                    slotted {{ slotProps.header.rowProperty }}
                </template>
                <template #name="slotProps">
                    slotted {{ slotProps.row.name }}
                </template>
                <template #action>
                    <UIButton category="brand">
                        CTA
                    </UIButton>
                </template>
                <template #footer>
                    <span class="font-bold text-color">
                        My wildly
                        long slotted footer content that I have to
                        make up words for such as
                        fubershlung (the act of drinking a beer after a devastating loss)
                        and shmelolia (a rare type of tulip's petals)
                    </span>
                </template>
            </UITable>
        </UIPanel>

        <UIPanel closed header="Searchable">
            <UITable :headers="headers"
                     :rows="rows"
                     search
                     disable-sorting />
        </UIPanel>

        <UIPanel closed header="With Selection">
            <UITable v-model="selectedRows"
                     :headers="headers"
                     :rows="rows"
                     selectable
                     disable-pagination
                     disable-sorting />
        </UIPanel>

        <UIPanel closed header="Using custom paginator">
            <UITable :headers="headers"
                     :items-per-page="5"
                     :rows="rows">
                <template #pagination="slotProps">
                    <div class="flex justify-end w-full">
                        <UIPagination :model-value="slotProps.page"
                                      :length="slotProps.pageCount"
                                      @update:model-value="val => slotProps.jumpToPage(val)" />
                    </div>
                </template>
            </UITable>
        </UIPanel>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Column, Row } from 'types';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'TableDemo',

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
            },
            {
                name: 'Bounty',
                calories: 497,
                fat: 29.0,
                carbs: 72,
                protein: 12,
                iron: '3'
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
