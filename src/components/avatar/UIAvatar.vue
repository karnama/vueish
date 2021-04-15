<template>
    <div class="ui-avatar text-lg overflow-hidden h-8 w-8
                text-white bg-red-500 flex flex-col justify-center items-center"
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
import { defineComponent, ref } from 'vue';
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
         * The content of .
         */
        content: String,

        /**
         * Display the avatar with square styling.
         */
        squared: Boolean
    },

    setup() {
        const loaded = ref(false);
        const personIcon = getIcon('person');

        return {
            loaded,
            personIcon
        };
    }
});
</script>
