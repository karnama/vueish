<template>
    <div ref="defaultSlot" class="relative">
        <slot />
        <span :style="position"
              class="rounded bg-brand-400 text-white px-2"
              v-bind="$attrs"
              :role="$attrs.role ?? 'status'">
            <slot name="content">
                {{ content }}
            </slot>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import type { PropType } from 'vue';
import { horizontal, vertical } from '@/types';

export default defineComponent({
    name: 'UIBadge',

    inheritAttrs: false,

    props: {
        /**
         * The horizontal position of the badge
         */
        horizontal: {
            type: String as PropType<typeof horizontal[number]>,
            default: 'right',
            validator: (val: typeof horizontal[number]) => horizontal.includes(val)
        },

        /**
         * The vertical position of the badge
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
        const position = computed(() => {
            const position: Partial<CSSStyleDeclaration> = {};
            position.position = 'absolute';

            const slotParameters = defaultSlot.value?.firstElementChild?.getBoundingClientRect();
            const badgeParameters = defaultSlot.value?.lastElementChild?.getBoundingClientRect();

            if (!slotParameters || !badgeParameters) {
                return position;
            }

            switch (props.horizontal) {
                case 'left':
                    position.left = `-${badgeParameters.width / 2}px`;
                    break;
                case 'right':
                    position.left = `${slotParameters.width - badgeParameters.width / 2}px`;
                    break;
                default:
                    position.left = `${slotParameters.width / 2 - badgeParameters.width / 2}px`;
            }

            switch (props.vertical) {
                case 'top':
                    position.top = `-${badgeParameters.height / 2}px`;
                    break;
                case 'bottom':
                    position.bottom = `-${badgeParameters.height / 2}px`;
                    break;
                default:
                    position.top = `${slotParameters.height / 2 - badgeParameters.height / 2}px`;
            }

            return position;
        });

        return {
            defaultSlot,
            position
        };
    }
});
</script>
