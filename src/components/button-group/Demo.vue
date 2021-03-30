<template>
    <div class="space-y-2 mb-4">
        <UICheckbox v-model="vertical" label="Vertical" />
        <UICheckbox v-model="spread" label="Spread" />
    </div>

    <UIButtonGroup :spread="spread" :vertical="vertical">
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

    <UIButtonGroup class="mt-10" :spread="spread" :vertical="vertical">
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
import { defineComponent, ref } from 'vue';
import UIButtonGroup from '@components/button-group/UIButtonGroup.vue';
import UIButton from '@components/button/UIButton.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';

export default defineComponent({
    name: 'ButtonGroup',

    components: { UICheckbox, UIButton, UIButtonGroup },

    setup: () => {
        const vertical = ref(true);
        const spread = ref(false);

        return {
            vertical,
            spread
        };
    }
});
</script>
