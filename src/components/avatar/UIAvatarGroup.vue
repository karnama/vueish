<template>
    <slot v-if="false" />
    <div class="ui-avatar-group flex items-center -space-x-2" v-bind="omit($attrs, ['class'])">
        <template v-if="avatars.length">
            <UIAvatar v-for="(avatar, index) in avatars.slice(0, max)"
                      :key="index"
                      :src="avatar.src"
                      :alt="avatar.alt"
                      :squared="avatar.hasOwnProperty('squared') ? !!avatar.squared : squared"
                      :content="avatar.hasOwnProperty('content') ? String(avatar.content) : ''"
                      :class="$attrs.class"
                      :style="[!reverseStacking ? 'z-index: ' + (avatars.length - index) + '0;' : '']" />
        </template>
        <template v-else>
            <component :is="avatar"
                       v-for="(avatar, index) in normalisedAvatars.slice(0, max)"
                       :key="index"
                       :class="$attrs.class"
                       :style="[!reverseStacking ? 'z-index: ' + (normalisedAvatars.length - index) + '0;' : '']" />
        </template>
        <UIAvatar v-if="(avatars.length ? avatars.length : normalisedAvatars.length) > max"
                  :class="$attrs.class"
                  :content="'+' + String((avatars.length ? avatars.length : normalisedAvatars.length) - max)"
                  :style="[!reverseStacking ? 'z-index: 1' : '']">
            +{{ (avatars.length ? avatars.length : normalisedAvatars.length) - max }}
        </UIAvatar>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType, VNode } from 'vue';
import UIAvatar from '@components/avatar/UIAvatar.vue';
import type { Avatar } from '@/types';
import { omit } from 'lodash-es';

export default defineComponent({
    name: 'UIAvatarGroup',

    components: { UIAvatar },

    inheritAttrs: false,

    props: {
        /**
         * The data for the avatars to create.
         */
        avatars: {
            type: Array as PropType<Avatar[]>,
            default: () => []
        },

        /**
         * The z index order of the avatars.
         */
        reverseStacking: {
            type: Boolean,
            default: false
        },

        /**
         * The maximum number of avatars to show.
         */
        max: {
            type: Number,
            default: 3
        },

        /**
         * Display the avatar with square styling.
         */
        squared: Boolean
    },

    setup(props, ctx) {
        const normalisedAvatars = computed<VNode[]>(() => {
            if (!ctx.slots.hasOwnProperty('default')) {
                return [];
            }

            return ctx.slots.default();
        });

        return {
            normalisedAvatars,
            omit
        };
    }
});
</script>

<style lang="scss">
.ui-avatar-group {
    & > .ui-avatar {
        border: 2px solid theme('colors.gray.100');
    }
}

.dark .ui-avatar-group {
    & > .ui-avatar {
        border: 2px solid theme('colors.gray.700');
    }
}
</style>
