<template>
    <slot name="title">
        {{ title }}
    </slot>
    <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UITab',

    props: {
        title: String
    },

    setup(props, ctx) {
        if (!props.title && !ctx.slots['title']) {
            throw new Error('The title prop or slot is required when using UITab.');
        }
    }
});
</script>
