<template>
    <div class="mb-12 text-center">
        <span v-tooltip="'hover text'" class="hover-tag">default hover position</span>
    </div>
    <div class="flex justify-between items-center flex-wrap">
        <span v-tooltip.top="'hover text'" class="hover-tag">top hover position</span>
        <span v-tooltip.top.right="'hover text'" class="hover-tag">top right hover position</span>
        <span v-tooltip.top.left="'hover text'" class="hover-tag">top left hover position</span>
        <span v-tooltip.bottom="'hover text'" class="hover-tag">bottom hover position</span>
        <span v-tooltip.bottom.right="'hover text'" class="hover-tag">bottom right hover position</span>
        <span v-tooltip.bottom.left="'hover text'" class="hover-tag">bottom left hover position</span>

        <span v-tooltip.left="'hover text'" class="hover-tag">left hover position</span>
        <span v-tooltip.right="'hover text'" class="hover-tag">right hover position</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Tooltip'
});
</script>

<style scoped lang="scss">
.hover-tag {
    @apply py-2 px-4 bg-gray-300 rounded text-gray-800 select-none m-5;
}
</style>
