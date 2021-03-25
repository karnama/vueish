<template>
    <div v-outer-html="html">
        Origin div
    </div>
    <span>This is after the inserted html</span>

    <hr class="my-4">

    <template v-outer-html="templateHtml">
        Origin template
    </template>

    <UIButton label="Change html" @click="change" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIButton from '@components/button/UIButton.vue';

export default defineComponent({
    name: 'OuterHtml',
    components: { UIButton },
    setup() {
        const html = ref('<h1>This is the next sibling of the origin</h1>');
        const templateHtml = ref('<h1>This has replaced the &lt;template&gt; tag</h1>');

        const change = () => {
            html.value += 'updated';
            templateHtml.value += 'updated';
            console.log(html.value);
        };

        return {
            html,
            templateHtml,
            change
        };
    }
});
</script>
