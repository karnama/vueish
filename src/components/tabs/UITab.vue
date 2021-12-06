<template>
    <div>
        <slot name="title">
            {{ title }}
        </slot>
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated } from 'vue';

export default defineComponent({
    name: 'UITab',

    props: {
        title: String
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
