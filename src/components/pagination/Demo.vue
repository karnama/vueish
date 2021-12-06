<template>
    <div class="mb-6 flex flex-col text-color">
        <UICheckbox v-model="disabled"
                    name="disabled"
                    label="Disabled"
                    class="mb-2" />
        <label>
            Page count ({{ length }})
            <input v-model="length"
                   type="range"
                   min="1"
                   max="100"
                   name="page-count">
        </label>

        <label>
            Visible Buttons ({{ visible }})
            <input v-model="visible"
                   type="range"
                   min="1"
                   :max="length"
                   step="2"
                   name="visible-buttons">
        </label>
    </div>

    <UIPagination v-model="page"
                  :length="length"
                  :disabled="disabled"
                  :visible-count="visible" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'PaginationDemo',

    setup() {
        const disabled = ref(false);
        const page = ref(5);
        const length = ref(10);
        const visible = ref(3);

        return {
            disabled,
            page,
            length,
            visible
        };
    }
});
</script>
