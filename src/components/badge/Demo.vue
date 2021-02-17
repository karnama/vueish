<template>
    <div class="space-y-5">
        <template v-for="h in horizontal" :key="h">
            <template v-for="v in vertical" :key="v">
                <UIBadge content="3"
                         :horizontal="h"
                         :vertical="v">
                    <UIButton type="primary">
                        My Button
                    </UIButton>
                </UIBadge>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIButton from '@components/button/UIButton.vue';
import UIBadge, { horizontal, vertical } from '@components/badge/UIBadge.vue';

export default defineComponent({
    name: 'Badge',
    components: { UIBadge, UIButton },
    setup() {
        return {
            horizontal,
            vertical
        };
    }
});
</script>
