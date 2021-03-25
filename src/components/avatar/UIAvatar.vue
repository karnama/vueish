<template>
    <div class="ui-avatar rounded-full text-lg overflow-hidden h-8 w-8
                text-white bg-red-500 flex flex-col justify-center items-center">
        <img v-show="src && loaded"
             :src="src"
             :alt="alt"
             @load="loaded = true"
             @error="loaded = false">
        <slot v-if="!loaded">
            <template v-if="alt">
                {{ alt.charAt(0).toUpperCase() }}
            </template>
            <template v-else>
                <span v-html="personIcon" />
            </template>
        </slot>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { getIcon } from '@/helpers';

export default defineComponent({
    name: 'UIAvatar',

    props: {
        /**
         * The alt text of the image.
         */
        alt: {
            type: String
        },

        /**
         * The source of the image.
         */
        src: {
            type: String
        }
    },

    setup(props) {
        const loaded = ref(false);
        const personIcon = getIcon('person');
        const showImg = computed(() => {
            return loaded.value && props.src;
        });

        return {
            loaded,
            personIcon,
            showImg
        };
    }
});
</script>
