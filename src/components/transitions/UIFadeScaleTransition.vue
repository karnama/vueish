<template>
    <transition-group v-if="group"
                      name="fade"
                      :appear="appear"
                      :enter-active-class="`transition ease-out ${durationIn}`"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      :leave-active-class="`transition ease-in ${durationOut}`"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95">
        <slot />
    </transition-group>

    <transition v-else
                :mode="mode"
                :enter-active-class="`transition ease-out ${durationIn}`"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                :leave-active-class="`transition ease-in ${durationOut}`"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
        <slot />
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UIFadeScaleTransition',

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
         * A class containing a transition timing function controlling
         * how long should the transition last when entering.
         */
        durationIn: {
            type: String,
            default: 'duration-100'
        },

        /**
         * A class containing a transition timing function controlling
         * how long should the transition last when entering.
         */
        durationOut: {
            type: String,
            default: 'duration-75'
        },

        /**
         * Boolean flag indicating to transition on appear.
         */
        appear: {
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
        }
    }
});
</script>
