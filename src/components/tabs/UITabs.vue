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
    <!--    <UIExpandTransition>-->
    <template v-if="tabVisible">
        <component :is="tab" />
    </template>

<!--    </UIExpandTransition>-->
</template>

<script lang="ts">
import UIExpandTransition from '@components/transitions/UIExpandTransition.vue';
import {computed, defineComponent, nextTick, ref, watch} from 'vue';
import type { VNode } from 'vue';

export default defineComponent({
    name: 'UITabs',

    components: { UIExpandTransition },

    setup(props, ctx) {
        const defaultSlot = ctx.slots.default();

        if (!defaultSlot.length) {
            throw new Error('UITabs expect at least 1 UITab in the default slot.');
        }

        const activeTab = ref(0);
        const titles = computed(() => {
            return defaultSlot.map((tab: VNode) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
