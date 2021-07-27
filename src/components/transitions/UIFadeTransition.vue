<template>
    <transition-group v-if="group"
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
import { appear, mode, group, durationIn, durationOut } from './props';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UIFadeTransition',

    props: {
        durationIn,
        durationOut,
        appear,
        mode,
        group
    }
});
</script>
