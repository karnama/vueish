<template>
    <transition-group v-if="group"
                      name="fade"
                      :appear="appear"
                      :enter-active-class="`transition ease-out ${durationIn}`"
                      enter-from-class="opacity-0 scale-95"
                      enter-to-class="opacity-100 scale-100"
                      :leave-active-class="`transition ease-in ${durationOut}`"
                      leave-from-class="opacity-100 scale-100"
                      leave-to-class="opacity-0 scale-95">
        <slot />
    </transition-group>

    <transition v-else
                :mode="mode"
                :enter-active-class="`transition ease-out ${durationIn}`"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                :leave-active-class="`transition ease-in ${durationOut}`"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95">
        <slot />
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { appear, mode, group } from './props';

export default defineComponent({
    name: 'UIFadeScaleTransition',

    props: {
        /**
         * A class containing a transition timing function controlling
         * how long should the transition last when entering.
         *
         * @default 'duration-100'
         */
        durationIn: {
            type: String,
            default: 'duration-100'
        },

        /**
         * A class containing a transition timing function controlling
         * how long should the transition last when entering.
         *
         * @default 'duration-75'
         */
        durationOut: {
            type: String,
            default: 'duration-75'
        },

        appear,
        mode,
        group
    }
});
</script>
