<template>
    <UIButtonGroup>
        <UIButton type="primary">
            Places
        </UIButton>
        <UIButton type="primary">
            List
        </UIButton>
        <UIButton type="primary">
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
