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
import { appear, mode, group } from './props';

export default {
    name: 'UIFadeTransition',

    props: {
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
        },

        appear,
        mode,
        group
    }
};
</script>
