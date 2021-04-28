<template>
    <div v-outer-html="html">
        Origin div
    </div>
    <span>This is after the inserted html</span>

    <hr class="my-4">

    <template v-outer-html="templateHtml" />

    <br>

    <small class="bg-red-600 shadow rounded text-white p-2">
        Dynamic values are not viable as it is uncertain hom many nodes has been created before
    </small>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import outerHtml from './index';

export default defineComponent({
    name: 'OuterHtml',
    directives: { outerHtml },
    setup() {
        const html = ref('<p>This is the next sibling of the origin</p>');
        const templateHtml = ref('<p>This has replaced the &lt;template&gt; tag</p>');

        return {
            html,
            templateHtml
        };
    }
});
</script>
