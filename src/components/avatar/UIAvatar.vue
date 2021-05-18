<template>
    <div class="ui-avatar text-lg overflow-hidden h-8 w-8
                text-white bg-brand-300 flex flex-col justify-center items-center"
         :class="[ squared ? 'rounded' : 'rounded-full' ]">
        <img v-show="src && loaded"
             :src="src"
             :alt="alt"
             :aria-hidden="src && loaded"
             @load="loaded = true"
             @error="loaded = false">
        <template v-if="!loaded">
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
