<template>
    <h1 class="dark:text-white">
        Scroll down 👇
    </h1>
    <div class="rounded-full h-6 w-6 sticky top-6 right-6 opacity-75 float-right"
         :class="[ onScreen ? 'bg-green-600' : 'bg-red-600' ]" />
    <div class="h-screen" />
    <div v-intersect.idle="onIntersect" class="py-2 px-4 bg-brand-600 text-white rounded shadow">
        Observed
    </div>
    <div class="h-screen" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'IntersectDemo',

    setup: () => {
        const onScreen = ref(false);
        const onIntersect = (isIntersecting: boolean) => {
            onScreen.value = isIntersecting;
        };

        return {
            onIntersect,
            onScreen
        };
    }
});
</script>
