<template>
    <div class="flex" :class="{ 'flex-col': !vertical }">
        <div class="flex justify-around" :class="{ 'flex-col': vertical }">
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
        <template v-if="tabVisible">
            <component :is="tab" />
        </template>
    </div>
    <template v-if="false">
        <slot />
    </template>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import type { VNode } from 'vue';

export default defineComponent({
    name: 'UITabs',

    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },

    setup(props, ctx) {
        let defaultSlot = ref<VNode[]>([]);

        const activeTab = ref(0);
        const titles = computed<string[]>(() => {
            return defaultSlot.value.map((tab: VNode) => {
                if (tab.props?.title) {
                    return tab.props.title;
                }

                if (tab.children?.title) {
                    return tab.children.title;
                }

                throw new Error('UITab expect to have the title prop or title slot set.');
            });
        });
        const tab = computed(() => {
            return defaultSlot.value[activeTab.value];
        });
        const tabVisible = ref(true);

        const setDefaultSlot = () => {
            defaultSlot.value = ctx.slots?.default instanceof Function ? ctx.slots.default() : [];

            if (defaultSlot.value.length < 2) {
                throw new Error('UITabs expect at least 2 UITabs in the default slot.');
            }
        };
        setDefaultSlot();

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
