<template>
    <div ref="uiContextMenu"
         aria-haspopup="true"
         class="w-max relative">
        <slot />
        <div v-if="isOpen"
             v-bind="$attrs"
             ref="menu"
             class="menu absolute flex flex-col items-stretch shadow-lg bg-white rounded z-50 overflow-scroll"
             :style="menuStyle"
             role="group"
             @click.stop>
            <slot name="menu" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUpdated, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { removeClickAway, addClickAway, createClickAwayListener } from '@composables/interactivity/clickAway';
import { clickAway } from '@composables/interactivity';
import { getPxValue } from '@composables/style';

export default defineComponent({
    name: 'UIDropdown',

    directives: { clickAway },

    inheritAttrs: false,

    props: {
        /**
         * The horizontal position of the menu.
         */
        horizontal: {
            type: String as PropType<'right' | 'left'>,
            default: 'right',
            validator: (val: 'right' | 'left') => ['right', 'left'].includes(val)
        },

        /**
         * The vertical position of the menu.
         */
        vertical: {
            type: String as PropType<'top' | 'bottom'>,
            default: 'bottom',
            validator: (val: 'top' | 'bottom') => ['top', 'bottom'].includes(val)
        },

        /**
         * The max height of the menu with px or vh notation.
         */
        maxHeight: {
            type: String,
            default: '35vh'
        },

        /**
         * The width of the menu with px or vw notation.
         */
        width: {
            type: String,
            default: '250px'
        },

        /**
         * Whether the position should be where
         * the mouse is currently at or not.
         */
        atMousePosition: {
            type: Boolean,
            default: false
        }
    },

    setup(props) {
        const isOpen = ref(false);
        const uiContextMenu = ref<HTMLDivElement>();
        const menu = ref<HTMLDivElement>();
        const mousePos = ref<{ x: number; y: number } | undefined>();

        const menuStyle = computed(() => {
            const style: Partial<CSSStyleDeclaration> = {};
            if (!uiContextMenu.value || !isOpen.value) {
                return style;
            }

            const contentParameters: DOMRect = uiContextMenu.value.getBoundingClientRect();
            const menuParameters = menu.value?.getBoundingClientRect();

            style.maxHeight = props.maxHeight;
            style.width = props.width;

            if (props.atMousePosition && mousePos.value) {
                // convert viewport values to px
                const width = getPxValue(props.width);
                const maxHeight = getPxValue(props.width);

                // doesn't fit on the right
                if (document.documentElement.clientWidth - (contentParameters.x + mousePos.value.x) <= width) {
                    style.left = `${mousePos.value.x - width}px`;
                } else {
                    style.left = `${mousePos.value.x}px`;
                }

                // doesn't fit on the bottom
                if (document.documentElement.clientHeight - (contentParameters.y + mousePos.value.y) <= maxHeight) {
                    style.top = `${mousePos.value.y - (menuParameters ? menuParameters.height : maxHeight)}px`;
                } else {
                    style.top = `${mousePos.value.y}px`;
                }

                return style;
            }

            if (props.horizontal === 'left') {
                style.left = '0px';
            } else {
                style.right = '0px';
            }

            if (props.vertical === 'top') {
                style.bottom = `${contentParameters.height}px`;
            } else {
                style.top = `${contentParameters.height}px`;
            }

            return style;
        });

        const toggle = (opened?: boolean) => {
            const bool = typeof opened === 'boolean' ? opened : !isOpen.value;

            if (bool === isOpen.value) return;

            if (!bool) {
                mousePos.value = undefined;
            }

            isOpen.value = bool;
        };
        const contextMenuClick = (event: MouseEvent) => {
            event.preventDefault();
            mousePos.value = { x: event.offsetX, y: event.offsetY };
            toggle(true);
        };

        onMounted(() => {
            if (props.atMousePosition) {
                uiContextMenu.value!.addEventListener('contextmenu', contextMenuClick);
            }

            createClickAwayListener(menu.value, { value: () => toggle(false), modifiers: {} });
        });
        onUpdated(() => {
            if (props.atMousePosition) {
                uiContextMenu.value!.removeEventListener('contextmenu', contextMenuClick);
                uiContextMenu.value!.addEventListener('contextmenu', contextMenuClick);
            } else {
                uiContextMenu.value!.removeEventListener('contextmenu', contextMenuClick);
            }
        });

        watch(() => isOpen.value, async val => {
            if (val) {
                addClickAway();
                await nextTick();
                menu.value!.addEventListener('contextmenu', e => e.stopPropagation());
            } else {
                menu.value!.removeEventListener('contextmenu', e => e.stopPropagation());
                removeClickAway();
            }
        });

        return {
            isOpen,
            toggle,
            uiContextMenu,
            menu,
            menuStyle
        };
    }
});
</script>
