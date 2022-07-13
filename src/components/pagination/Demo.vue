<template>
    <div class="mb-6 flex flex-col text-color">
        <UICheckbox v-model="disabled"
                    name="disabled"
                    label="Disabled" />
        <UICheckbox v-model="large"
                    label="Large Style"
                    name="large"
                    class="my-2" />
        <UICheckbox v-model="small" label="Small Style" name="small" />

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
                  :large="large"
                  :small="small"
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
        const large = ref(false);
        const small = ref(false);

        return {
            disabled,
            page,
            length,
            visible,
            large,
            small
        };
    }
});
</script>
