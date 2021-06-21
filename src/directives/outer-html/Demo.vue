<template>
    <div v-outer-html="html" class="text-color">
        Origin div
    </div>
    <span class="text-color">This is after the inserted html</span>

    <hr class="my-4 text-color">

    <!-- eslint-disable-next-line vue/no-lone-template -->
    <template v-outer-html="templateHtml" />

    <br>

    <small class="bg-red-600 shadow rounded text-white p-2">
        Dynamic values are not viable as it is uncertain how many nodes has been created before
    </small>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import outerHtml from './index';

export default defineComponent({
    name: 'OuterHtml',
    directives: { outerHtml },
    setup() {
        const html = ref('<p class="text-color">This is the next sibling of the origin</p>');
        const templateHtml = ref('<p class="text-color">This has replaced the &lt;template&gt; tag</p>');

        return {
            html,
            templateHtml
        };
    }
});
</script>
