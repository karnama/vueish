<template>
<!--    <div v-outer-html="html">-->
<!--        Origin div-->
<!--    </div>-->
<!--    <span>This is after the inserted html</span>-->

<!--    <hr class="my-4">-->

    <template v-outer-html="templateHtml" />

    <UIButton label="Change html" @click="change" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIButton from '@components/button/UIButton.vue';

export default defineComponent({
    name: 'OuterHtml',
    components: { UIButton },
    setup() {
        const html = ref('<p>This is the next sibling of the origin</p>');
        const templateHtml = ref('<p>This has replaced the &lt;template&gt; tag</p>');

        const change = () => {
            html.value += '<p>updated</p>';
            templateHtml.value = templateHtml.value + '<p>updated</p>';
        };

        return {
            html,
            templateHtml,
            change
        };
    }
});
</script>
