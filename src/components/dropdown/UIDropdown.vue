<template>
    <div ref="uiDropdown"
         aria-haspopup="true"
         class="ui-dropdown w-max relative">
        <slot name="trigger"
              :toggle="toggle"
              :show="show"
              :hide="hide" />

        <div v-if="isOpen"
             v-bind="$attrs"
             ref="dropdown"
             v-click-away="hide"
             class="dropdown absolute z-50 rounded overflow-scroll flex flex-col items-stretch shadow-lg
                    bg-white dark:bg-gray-600 ring-1 ring-opacity-5 ring-black dark:ring-white dark:ring-opacity-5"
             :style="dropdownStyle"
             role="group"
             @click.stop>
            <slot :toggle="toggle" :show="show" :hide="hide" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue';
import type { PropType } from 'vue';
import clickAway from '@/directives/click-away';
import { getPxValue } from 'composables/style';

export default defineComponent({
    name: 'UIDropdown',

    directives: { clickAway },

    inheritAttrs: false,

    props: {
        /**
         * The horizontal position of the dropdown.
         */
        horizontal: {
            type: String as PropType<'right' | 'left'>,
            default: 'right',
            validator: (val: 'right' | 'left') => ['right', 'left'].includes(val)
        },

        /**
         * The vertical position of the dropdown.
         */
        vertical: {
            type: String as PropType<'top' | 'bottom'>,
            default: 'bottom',
            validator: (val: 'top' | 'bottom') => ['top', 'bottom'].includes(val)
        },

        /**
         * The max height of the dropdown with px or vh notation.
         */
        maxHeight: {
            type: String,
            default: '35vh'
        },

        /**
         * The width of the dropdown with px or vw notation if using atMousePosition
         * otherwise css rule accepted values.
         */
        // todo add cross validation when https://github.com/vuejs/vue-next/pull/3258 merged then default to auto
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

            const contentParameters: DOMRect = uiDropdown.value.getBoundingClientRect();
            const dropdownParameters = dropdown.value?.getBoundingClientRect();

            style.maxHeight = props.maxHeight;
            style.width = props.width;

            if (props.atMousePosition) {
                // convert viewport values to px
                const width = getPxValue(props.width);
                const maxHeight = getPxValue(props.width);

                // doesn't fit on the right
                if (document.documentElement.clientWidth - (contentParameters.x + mousePos.x) <= width) {
                    style.left = `${mousePos.x - width}px`;
                } else {
                    style.left = `${mousePos.x}px`;
                }

                // doesn't fit on the bottom
                if (document.documentElement.clientHeight - (contentParameters.y + mousePos.y) <= maxHeight) {
                    style.top = `${mousePos.y - (dropdownParameters ? dropdownParameters.height : maxHeight)}px`;
                } else {
                    style.top = `${mousePos.y}px`;
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
