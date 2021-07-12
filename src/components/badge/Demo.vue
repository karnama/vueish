<template>
    <div class="space-y-5">
        <template v-for="h in horizontal" :key="h">
            <template v-for="v in vertical" :key="v">
                <UIBadge content="3"
                         :horizontal="h"
                         :vertical="v">
                    <UIButton category="primary">
                        My Button
                    </UIButton>
                </UIBadge>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { horizontal, vertical } from '@/types';

export default defineComponent({
    name: 'Badge',

    setup() {
        return {
            horizontal,
            vertical
        };
    }
});
</script>
