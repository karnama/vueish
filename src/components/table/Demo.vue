<template>
    <UITable :headers="headers" :rows="rows" hover-highlight />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UITable from '@components/table/UITable.vue';
import { Column, Row } from '@components/table/UITableTypes';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Table',
    components: { UITable },
    setup() {
        const headers = ref<Column[]>([
            { header: 'Dessert (100g serving)', rowProperty: 'name' },
            { header: 'Calories', rowProperty: 'calories' },
            { header: 'Fat (g)', rowProperty: 'fat' },
            { header: 'Carbs (g)', rowProperty: 'carbs' },
            { header: 'Protein (g)', rowProperty: 'protein' },
            { header: 'Iron (%)', rowProperty: 'iron' }
        ]);
        const rows = ref<Row[]>([
            {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: '1%'
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: '1%'
            },
            {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: '7%'
            },
            {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: '8%'
            },
            {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: '16%'
            },
            {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: '0%'
            },
            {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: '2%'
            },
            {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: '45%'
            },
            {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: '22%'
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%'
            }
        ]);

        return {
            headers,
            rows
        };
    }
});
</script>
