<template>
    <div ref="defaultSlot" class="ui-badge relative">
        <slot />
        <span :style="positioningStyle"
              class="rounded bg-brand-400 text-white px-2 absolute"
              v-bind="$attrs"
              role="status">
            <slot name="content">
                {{ content }}
            </slot>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import type { PropType } from 'vue';
import { horizontal, vertical } from '@public-types';

export default defineComponent({
    name: 'UIBadge',

    inheritAttrs: false,

    props: {
        /**
         * The horizontal position of the badge.
         */
        horizontal: {
            type: String as PropType<typeof horizontal[number]>,
            default: 'right',
            validator: (val: typeof horizontal[number]) => horizontal.includes(val)
        },

        /**
         * The vertical position of the badge.
         */
        vertical: {
            type: String as PropType<typeof vertical[number]>,
            default: 'top',
            validator: (val: typeof vertical[number]) => vertical.includes(val)
        },

        content: {
            type: [String, Number]
        }
    },

    setup(props) {
        const defaultSlot = ref<HTMLDivElement>();
        const positioningStyle = computed(() => {
            const style: Partial<CSSStyleDeclaration> = {};

            const slotParameters = defaultSlot.value?.firstElementChild?.getBoundingClientRect();
            const badgeParameters = defaultSlot.value?.lastElementChild?.getBoundingClientRect();

            if (!slotParameters || !badgeParameters) {
                return style;
            }

            switch (props.horizontal) {
                case 'left':
                    style.left = `-${badgeParameters.width / 2}px`;
                    break;
                case 'right':
                    style.left = `${slotParameters.width - badgeParameters.width / 2}px`;
                    break;
                default:
                    style.left = `${slotParameters.width / 2 - badgeParameters.width / 2}px`;
            }

            switch (props.vertical) {
                case 'top':
                    style.top = `-${badgeParameters.height / 2}px`;
                    break;
                case 'bottom':
                    style.bottom = `-${badgeParameters.height / 2}px`;
                    break;
                default:
                    style.top = `${slotParameters.height / 2 - badgeParameters.height / 2}px`;
            }

            return style;
        });

        return {
            defaultSlot,
            positioningStyle
        };
    }
});
</script>
