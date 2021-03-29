<template>
    <UIButtonGroup>
        <UIButton category="primary">
            Places
        </UIButton>
        <UIButton category="primary">
            List
        </UIButton>
        <UIButton category="primary">
            Map
        </UIButton>
    </UIButtonGroup>

    <UIButtonGroup class="mt-10">
        <UIButton outline category="info">
            Places
        </UIButton>
        <UIButton outline category="info">
            List
        </UIButton>
        <UIButton category="primary" outline>
            Map
        </UIButton>
    </UIButtonGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIButtonGroup from '@components/button-group/UIButtonGroup.vue';
import UIButton from '@components/button/UIButton.vue';

export default defineComponent({
    name: 'ButtonGroup',
    components: { UIButton, UIButtonGroup }
});
</script>
