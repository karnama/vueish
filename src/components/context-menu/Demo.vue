<template>
    <p>Default example</p>
    <UIContextMenu ref="contextMenu" at-mouse-position>
        <UIButton type="primary" @click.stop="$refs.contextMenu.toggle()">
            Toggle
        </UIButton>
        <template #menu>
            <div class="divide-y">
                <div v-for="index in range(10)"
                     :key="index"
                     class="px-4 py-2 text-gray-600 hover:bg-gray-700 transition hover:text-white">
                    custom content and stuff plus things {{ index }}
                </div>
            </div>
        </template>
    </UIContextMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UIButton from '@components/button/UIButton.vue';
import UIContextMenu from '@components/context-menu/UIContextMenu.vue';
import { range } from 'lodash-es';

export default defineComponent({
    name: 'ContextMenu',

    components: { UIContextMenu, UIButton },

    setup: () => ({ range })
});
</script>
