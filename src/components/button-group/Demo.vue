<template>
    <div class="space-y-2 mb-4">
        <UICheckbox v-model="vertical" label="Vertical" name="vertical" />
        <UICheckbox v-model="spread" label="Spread" name="spread" />
    </div>

    <UIButtonGroup :spread="spread" :vertical="vertical">
        <UIButton theme="blue">
            Places
        </UIButton>
        <UIButton theme="blue">
            List
        </UIButton>
        <UIButton theme="blue">
            Map
        </UIButton>
    </UIButtonGroup>

    <UIButtonGroup class="mt-10" :spread="spread" :vertical="vertical">
        <UIButton outline theme="sky">
            Places
        </UIButton>
        <UIButton outline theme="sky">
            List
        </UIButton>
        <UIButton theme="blue" outline>
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
