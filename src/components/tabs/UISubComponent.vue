<template>
    <button class="rounded border bg-blue-600 text-white px-4 py-2" @click="increment">
        inc
    </button>
    <p>my-number:{{ number }}</p>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    name: 'UISubComponent',

    setup: () => {
        const number = ref(0);
        const increment = () => number.value++;

        // eslint-disable-next-line no-console
        onMounted(() => console.log('sub comp mounted'));
        return { number, increment };
    }
});
</script>

