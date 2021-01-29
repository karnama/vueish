<template>
    <transition-group v-if="group" name="fade">
        <slot />
    </transition-group>

    <transition v-else name="fade" :mode="mode">
        <slot />
    </transition>
</template>

<script lang="ts">
export default {
    name: 'UIFadeTransition',

    props: {
        /**
         * Boolean flag to indicate whether the transition
         * should operate in group mode or not.
         *
         * @type {boolean}
         */
        group: {
            type: Boolean,
            default: false
        },

        /**
         * The mode to apply to the transition.
         *
         * @type {string}
         */
        mode: {
            type: String,
            required: false
        }
    }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 200ms;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
