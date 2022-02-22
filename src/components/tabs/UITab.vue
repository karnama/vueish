<template>
    <div class="m-4">
        <template v-if="false">
            <slot name="title" />
        </template>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated } from 'vue';

export default defineComponent({
    name: 'UITab',

    props: {
        title: {
            type: String
        },

        /**
         * The key to emit when the tab is navigated to.
         */
        tabKey: {
            type: String
        },

        /**
         * Flag indicating that this tab is visible by default.
         * If multiple UITabs marked with default, the first will be selected.
         */
        default: {
            type: Boolean,
            default: false
        }
    },

    setup(props, ctx) {
        const validateTitle = () => {
            if (!props.title && !ctx.slots['title']) {
                throw new Error('The title prop or slot is required when using UITab.');
            }
        };

        validateTitle();

        onUpdated(validateTitle);
    }
});
</script>
