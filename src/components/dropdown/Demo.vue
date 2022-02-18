<template>
    <UICheckbox v-model="atMousePosition" label="Positioned on the mouse" name="at_mouse_position" />

    <p class="mt-10 text-color">
        Left click
    </p>
    <UIDropdown :at-mouse-position="atMousePosition">
        <template #trigger="{toggle}">
            <UIButton type="primary" @click.stop="toggle">
                Toggle
            </UIButton>
        </template>

        <template #default="{ hide }">
            <div class="divide-y divide-gray-500">
                <div class="px-4 py-2 text-color transition-colors select-none bg-gray-500 hover:bg-gray-700"
                     @click="hide">
                    Item that implements visibility handler on click.
                </div>
                <div v-for="index in range(10)"
                     :key="index"
                     class="px-4 py-2 text-color transition-colors select-none hover:bg-gray-700">
                    custom content and stuff plus things {{ index + 1 }}
                </div>
            </div>
        </template>
    </UIDropdown>

    <p class="mt-10 text-color">
        Right click (context menu - without transition)
    </p>
    <UIDropdown :at-mouse-position="atMousePosition" :transition-component="null">
        <template #trigger="{ toggle }">
            <img src="https://source.unsplash.com/random/400x300" alt="Clickable Image" @contextmenu.prevent="toggle">
        </template>

        <div class="divide-y">
            <div v-for="index in range(10)"
                 :key="index"
                 class="px-4 py-2 text-color hover:bg-gray-700 transition-colors">
                custom content and stuff plus things {{ index + 1 }}
            </div>
        </div>
    </UIDropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { range } from 'lodash-es';
import UIFadeTransition from 'components/transitions/UIFadeTransition.vue';

export default defineComponent({
    name: 'DropdownDemo',

    setup: () => {
        const atMousePosition = ref(false);

        return { range, atMousePosition, UIFadeTransition };
    }
});
</script>
