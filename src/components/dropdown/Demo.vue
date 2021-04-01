<template>
    <UICheckbox v-model="atMousePosition" label="Positioned on the mouse" name="at_mouse_position" />

    <p class="mt-10">Left click</p>
    <UIDropdown :at-mouse-position="atMousePosition">
        <template #trigger="{toggle}">
            <UIButton type="primary" @click.stop="toggle">
                Toggle
            </UIButton>
        </template>

        <div class="divide-y">
            <div v-for="index in range(10)"
                 :key="index"
                 class="px-4 py-2 text-gray-600 hover:bg-gray-700 transition hover:text-white">
                custom content and stuff plus things {{ index }}
            </div>
        </div>
    </UIDropdown>

    <p class="mt-10">Right click (context menu)</p>
    <UIDropdown ref="contextMenu" :at-mouse-position="atMousePosition">
        <template #trigger="{toggle}">
            <img src="https://source.unsplash.com/random/400x300" alt="Clickable Image" @contextmenu.prevent="toggle">
        </template>

        <div class="divide-y">
            <div v-for="index in range(10)"
                 :key="index"
                 class="px-4 py-2 text-gray-600 hover:bg-gray-700 transition hover:text-white">
                custom content and stuff plus things {{ index }}
            </div>
        </div>
    </UIDropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIButton from '@components/button/UIButton.vue';
import UIDropdown from '@components/dropdown/UIDropdown.vue';
import { range } from 'lodash-es';
import UICheckbox from '@components/checkbox/UICheckbox.vue';

export default defineComponent({
    name: 'Dropdown',

    components: { UICheckbox, UIDropdown, UIButton },

    setup: () => {
        const atMousePosition = ref(false);

        return { range, atMousePosition };
    }
});
</script>
