<template>
    <div class="flex rounded border border-gray-300 bg-white" :class="{ 'flex-col': !vertical }">
        <div class="flex justify-around divide-gray-300"
             :class="{ 'flex-col divide-y-2': vertical, 'divide-x-2': !vertical }">
            <div v-for="(title, index) in titles"
                 :key="index"
                 :class="{ 'active-tab': index === activeTab, 'flex flex-col justify-center': vertical }"
                 class="cursor-pointer bg-red-100 w-full text-center p-2 h-full"
                 @click="activeTab = index">
                <template v-if="typeof title === 'string'">
                    {{ title }}
                </template>
                <component :is="title" v-else />
            </div>
        </div>
        <template v-for="(tab, index) in defaultSlot" :key="index">
            <component :is="tab" v-show="index === activeTab" />
        </template>
        <template v-if="false">
            <slot />
        </template>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import type { VNode } from 'vue';

export default defineComponent({
    name: 'UITabs',

    props: {
        /**
         * Flag indicating to align the tabs vertically.
         */
        vertical: {
            type: Boolean,
            default: false
        },

        /**
         * The tab to display initially when rendering.
         * Must match a tab-key given to the UITab components.
         * This takes priority over the 'default' property on UITab component.
         */
        initialTab: {
            type: String
        }
    },

    emits: ['change'],

    setup(props, ctx) {
        let defaultSlot = ref<VNode[]>([]);
        const activeTab = ref(0);
        const tabVisible = ref(true);

        const titles = computed<string[]>(() => {
            return defaultSlot.value.map((tab) => {
                if (tab.props?.title) {
                    return tab.props.title;
                }

                // @ts-expect-error TS2339: Property 'title' does not exist
                if (tab.children?.title) {
                    // @ts-expect-error TS2339: Property 'title' does not exist
                    return tab.children.title;
                }

                throw new Error('UITab expect to have the title prop or title slot set.');
            });
        });
        const tab = computed(() => {
            return defaultSlot.value[activeTab.value];
        });

        const setDefaultSlot = () => {
            defaultSlot.value = ctx.slots?.default instanceof Function ? ctx.slots.default() : [];

            if (defaultSlot.value.length < 2) {
                throw new Error('UITabs expect at least 2 UITabs in the default slot.');
            }
        };
        const setActiveTab = () => {
            if (!props.initialTab) {
                const tabIndex = defaultSlot.value.findIndex(vNode => vNode.props?.default);

                activeTab.value = tabIndex === -1 ? 0 : tabIndex;
                // tab.value = defaultSlot.value[activeTab];
                return;
            }

            const tabIndex = defaultSlot.value.findIndex(vNode =>
                vNode.props
                && 'tab-key' in vNode.props
                && vNode.props['tab-key'] === props.initialTab
            );

            activeTab.value = tabIndex === -1 ? 0 : tabIndex;
        };

        setDefaultSlot();
        setActiveTab();

        // hack as getCurrentInstance() seems to be null hence can't call .update()
        watch(() => tab.value, async (value) => {
            tabVisible.value = false;
            await nextTick();
            tabVisible.value = true;

            if (value.props && 'tab-key' in value.props) {
                ctx.emit('change', value.props['tab-key']);
            }
        });

        return {
            titles,
            tabVisible,
            activeTab,
            defaultSlot
        };
    },

    methods: {
        forceUpdate() {
            this.$forceUpdate();
        }
    }
});
</script>
