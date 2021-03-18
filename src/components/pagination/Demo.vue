<template>
    <div class="mb-6">
        <UICheckbox v-model="disabled"
                    name="disabled"
                    label="Disabled"
                    class="mb-2" />
        <UIRangeSlider v-model="length"
                       name="page-count"
                       label="Page Count"
                       min="1" />
        <UIRangeSlider v-model="visible"
                       name="visible"
                       label="Visible Buttons"
                       min="0"
                       :max="length" />
    </div>

    <UIPagination v-model="page"
                  :length="length"
                  :disabled="disabled"
                  :total-visible="visible" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIPagination from '@components/pagination/UIPagination.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';
import UIRangeSlider from '@components/range-slider/UIRangeSlider.vue';

export default defineComponent({
    name: 'Pagination',
    components: { UIRangeSlider, UICheckbox, UIPagination },

    setup() {
        const disabled = ref(false);
        const page = ref(1);
        const length = ref(5);
        const visible = ref(5);

        return {
            disabled,
            page,
            length,
            visible
        };
    }
});
</script>
