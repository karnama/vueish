<template>
    <div class="ui-avatar-group flex items-center -space-x-3">
        <slot />
        <UIAvatar />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import UIAvatar from '@components/avatar/UIAvatar.vue';

type Avatar = {
    src?: string;
    alt?: string;
    content?: string;
};

export default defineComponent({
    name: 'UIAvatarGroup',
    components: { UIAvatar },
    props: {
        /**
         * The data for the avatars to create.
         */
        avatars: {
            type: Array as PropType<Avatar[]>,
            default: []
        },

        /**
         * The maximum number of avatars to show.
         */
        max: {
            type: Number,
            default: 3
        }
    },

    setup(props, ctx) {
        const normalisedAvatars = computed<Avatar[]>(() => {
            const avatars = ctx.slots?.default();

            if (!avatars) {
                return props.avatars;
            }

            console.log(avatars);
        });
        return {

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
</style>
