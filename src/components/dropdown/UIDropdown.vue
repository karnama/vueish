<template>
    <div ref="uiDropdown"
         aria-haspopup="true"
         class="ui-dropdown w-max relative">
        <slot name="trigger"
              :toggle="toggle"
              :show="show"
              :hide="hide" />

        <Teleport to="body">
            <template v-if="transitionComponent">
                <component :is="transitionComponent">
                    <div v-if="isOpen"
                         v-bind="$attrs"
                         ref="dropdown"
                         v-click-away="hide"
                         class="dropdown absolute z-50 rounded overflow-auto flex flex-col items-stretch shadow-lg
                                bg-white dark:bg-gray-600 h-max
                                ring-1 ring-opacity-5 ring-black dark:ring-white dark:ring-opacity-5"
                         :style="dropdownStyle"
                         role="group"
                         @click.stop>
                        <slot :toggle="toggle" :show="show" :hide="hide" />
                    </div>
                </component>
            </template>
            <div v-else-if="isOpen"
                 v-bind="$attrs"
                 ref="dropdown"
                 v-click-away="hide"
                 class="dropdown absolute z-50 rounded overflow-auto flex flex-col items-stretch shadow-lg
                        bg-white dark:bg-gray-600 h-max
                        ring-1 ring-opacity-5 ring-black dark:ring-white dark:ring-opacity-5"
                 :style="dropdownStyle"
                 role="group"
                 @click.stop>
                <slot :toggle="toggle" :show="show" :hide="hide" />
            </div>
        </Teleport>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue';
import type { PropType } from 'vue';
import clickAway from '@/directives/click-away';
import { getPxValue } from 'composables/style';
import UIFadeScaleTransition from '../transitions/UIFadeScaleTransition.vue';

export default defineComponent({
    name: 'UIDropdown',

    directives: { clickAway },

    inheritAttrs: false,

    props: {
        /**
         * The horizontal position of the dropdown.
         *
         * @default 'right'
         */
        horizontal: {
            type: String as PropType<'right' | 'left'>,
            default: 'right',
            validator: (val: 'right' | 'left') => ['right', 'left'].includes(val)
        },

        /**
         * The vertical position of the dropdown.
         *
         * @default 'bottom'
         */
        vertical: {
            type: String as PropType<'top' | 'bottom'>,
            default: 'bottom',
            validator: (val: 'top' | 'bottom') => ['top', 'bottom'].includes(val)
        },

        /**
         * The max height of the dropdown with px or vh notation.
         *
         * @default '35vh'
         */
        maxHeight: {
            type: String,
            default: '35vh'
        },

        /**
         * The width of the dropdown with px or vw notation if using atMousePosition
         * otherwise css rule accepted values.
         *
         * @default '250px'
         */
        // todo add cross validation when https://github.com/vuejs/vue-next/pull/3258 merged then default to auto
        width: {
            type: String,
            default: '250px'
        },

        /**
         * Whether the position should be where
         * the mouse is currently at or not.
         *
         * @default false
         */
        atMousePosition: {
            type: Boolean,
            default: false
        },

        /**
         * The component that controls how the dropdown transitions.
         * This can be either a falsy value or a html tag name or a component definition.
         *
         * @default UIFadeScaleTransition
         */
        transitionComponent: {
            type: [Object, String] as PropType<ReturnType<typeof defineComponent> | null>,
            default: UIFadeScaleTransition
        }
    },

    emits: ['open', 'close'],

    expose: ['hide', 'show', 'toggle'],

    setup(props, ctx) {
        const isOpen = ref(false);
        const uiDropdown = ref<HTMLDivElement>();
        const dropdown = ref<HTMLDivElement>();
        const mousePos = reactive({
            x: 0,
            y: 0
        });

        const dropdownStyle = computed(() => {
            const style: Partial<CSSStyleDeclaration> = {};

            if (!uiDropdown.value || !isOpen.value) {
                return style;
            }

            const dropdownRect: DOMRect = uiDropdown.value.getBoundingClientRect();
            const contentRect = dropdown.value?.getBoundingClientRect();

            style.maxHeight = props.maxHeight;
            style.width = props.width;

            if (props.atMousePosition) {
                // convert viewport values to px
                const width = getPxValue(props.width);
                const maxHeight = getPxValue(props.width);

                // doesn't fit on the right
                if (globalThis?.document.documentElement.clientWidth - (dropdownRect.x + mousePos.x) <= width) {
                    style.left = `${dropdownRect.left + mousePos.x - width}px`;
                } else {
                    style.left = `${dropdownRect.left + mousePos.x}px`;
                }

                const top = dropdownRect.top + mousePos.y + globalThis?.document.documentElement.scrollTop;
                // doesn't fit on the bottom
                if (globalThis?.document.documentElement.scrollTop
                    + globalThis?.document.documentElement.clientHeight
                    - top <= maxHeight
                ) {
                    style.top = `${top - (contentRect ? contentRect.height : maxHeight)}px`;
                } else {
                    style.top = `${top}px`;
                }

                return style;
            }

            const contentHeight = contentRect ? contentRect.height : 0;
            const contentWidth = contentRect ? contentRect.width : 0;

            if (props.horizontal === 'left') {
                style.left = `${dropdownRect.left}px`;
            } else {
                style.left = `${dropdownRect.left + dropdownRect.width - contentWidth}px`;
            }

            // todo - if there's no space to show the content in the current clientHeight(it can still scroll)
            //  anchor to bottom of the screen
            if (props.vertical === 'top') {
                const position = globalThis.document.documentElement.scrollTop
                    + dropdownRect.top
                    - contentHeight
                    - getPxValue('1rem');
                // if negative value, anchor to top of window
                style.top = `${Math.max(0, position)}px`;
            } else {
                let top = globalThis?.document.documentElement.scrollTop
                    + dropdownRect.top
                    + dropdownRect.height;

                if (globalThis?.document.documentElement.scrollHeight <= top + contentHeight) {
                    top = globalThis?.document.documentElement.scrollHeight - contentHeight;
                }

                style.top = `${top}px`;
            }

            return style;
        });

        const show = (event?: MouseEvent) => {
            if (event && props.atMousePosition) {
                mousePos.x = event.offsetX;
                mousePos.y = event.offsetY;
            } else {
                ctx.emit('open');
            }

            isOpen.value = true;
        };
        const hide = () => {
            isOpen.value = false;
            ctx.emit('close');
        };
        const toggle = (event?: MouseEvent) => {
            // If the dropdown is showing via contextmenu event, and the user has triggered
            // another contextmenu event then reshow the dropdown at the new mouse
            // position.
            const reshow = isOpen.value && props.atMousePosition && event?.type === 'contextmenu';

            if (isOpen.value) {
                hide();
            } else {
                show(event);
            }

            if (reshow) {
                show(event);
            }
        };

        return {
            isOpen,
            toggle,
            show,
            hide,
            uiDropdown,
            dropdown,
            dropdownStyle
        };
    }
});
</script>
