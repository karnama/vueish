<template>
    <div class="space-y-2 mb-4">
        <UICheckbox v-model="vertical" label="Vertical" name="vertical" />
        <UICheckbox v-model="spread" label="Spread" name="spread" />
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

// todo - missing tests
export default defineComponent({
    name: 'ButtonGroup',

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
