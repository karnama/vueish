<template>
    <div class="ui-avatar text-lg overflow-hidden min-h-[2rem] min-w-[2rem] h-8 w-8
                text-white bg-brand-400 flex flex-col justify-center items-center"
         :class="[ squared ? 'rounded' : 'rounded-full' ]">
        <img v-if="src && loaded"
             :src="src"
             :alt="alt"
             @error="loaded = false">
        <template v-else>
            <slot v-if="$slots.default" />
            <template v-else-if="content">
                {{ content }}
            </template>
            <template v-else-if="alt">
                {{ alt.charAt(0).toUpperCase() }}
            </template>
            <span v-else v-html="personIcon" />
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { getIcon } from '@/helpers';

export default defineComponent({
    name: 'UIAvatar',

    props: {
        /**
         * The alt text of the image.
         */
        alt: String,

        /**
         * The source of the image.
         */
        src: String,

        /**
         * The content of the avatar.
         */
        content: String,

        /**
         * Display the avatar with square styling.
         */
        squared: Boolean
    },

    setup(props) {
        const loaded = ref(true);
        const personIcon = getIcon('person');

        watch(() => props.src, () => loaded.value = true);

        return {
            loaded,
            personIcon
        };
    }
});
</script>
