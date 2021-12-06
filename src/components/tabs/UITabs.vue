<template>
    <div class="flex rounded border border-gray-300 bg-white" :class="{ 'flex-col': !vertical }">
        <div class="flex justify-around divide-gray-300"
             :class="{ 'flex-col divide-y-2': vertical, 'divide-x-2': !vertical }">
            <div v-for="(title, index) in titles"
                 :key="index"
                 :class="{ 'active-tab': index === activeTab }"
                 class="cursor-pointer bg-red-100 w-full text-center p-2"
                 @click="activeTab = index">
                <template v-if="typeof title === 'string'">
                    {{ title }}
                </template>
                <component :is="title" v-else />
            </div>
        </div>
        <div v-if="tabVisible" class="m-4">
            <component :is="tab" />
        </div>
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
