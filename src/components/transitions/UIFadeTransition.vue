<template>
    <transition-group v-if="group"
                      name="fade"
                      :appear="appear"
                      :enter-active-class="`transition-opacity ease-in ${durationIn}`"
                      enter-from-class="opacity-0"
                      enter-to-class="opacity-100"
                      :leave-active-class="`transition-opacity ease-out ${durationOut}`"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
        <slot />
    </transition-group>

    <transition v-else
                :appear="appear"
                :enter-active-class="`transition-opacity ease-in ${durationIn}`"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                :leave-active-class="`transition-opacity ease-out ${durationOut}`"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                :mode="mode">
        <slot />
    </transition>
</template>

<script lang="ts">
export default {
    name: 'UIFadeTransition',

    props: {
        /**
         * Boolean flag indicating to transition on appear.
         */
        appear: {
            type: Boolean,
            default: false
        },

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
            default: 'out-in'
        },

        /**
         * A class containing a transition timing function controlling
         * how long should the transition last when entering.
         */
        durationIn: {
            type: String,
            default: 'duration-200'
        },

        /**
         * A class containing a transition timing function controlling
         * how long should the transition last when entering.
         */
        durationOut: {
            type: String,
            default: 'duration-200'
        }
    }
};
</script>
