<template>
    <div class="flex justify-around">
        <div v-for="(title, index) in titles"
             :key="index"
             :class="{ 'active-tab': Number(index) === activeTab }"
             class="cursor-pointer"
             @click="activeTab = index">
            <template v-if="typeof title === 'string'">
                {{ title }}
            </template>
            <component :is="title" v-else />
        </div>
    </div>
    <template v-if="false">
        <slot />
    </template>
    <template v-if="tabVisible">
        <component :is="tab" />
    </template>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import type { VNode } from 'vue';

export default defineComponent({
    name: 'UITabs',

    setup(props, ctx) {
        const defaultSlot = ctx.slots?.default instanceof Function ? ctx.slots.default() : [];

        if (defaultSlot.length < 2) {
            throw new Error('UITabs expect at least 1 UITab in the default slot.');
        }

        const activeTab = ref(0);
        const titles = computed<string[]>(() => {
            return defaultSlot.map((tab: VNode) => {
                return tab.props?.title ?? tab.children.title;
            });
        });
        const tab = computed(() => {
            return defaultSlot[activeTab.value];
        });

        const tabVisible = ref(true);
        // hack as getCurrentInstance() seems to be null hence can't call .update()
        watch(() => tab.value, async () => {
            tabVisible.value = false;
            await nextTick();
            tabVisible.value = true;
        });

        return {
            titles,
            tabVisible,
            activeTab,
            tab
        };
    }
});
</script>
