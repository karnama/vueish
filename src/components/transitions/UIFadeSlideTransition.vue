<template>
    <transition-group v-if="group"
                      :appear="appear"
                      :mode="mode"
                      enter-from-class="opacity-0 enter-from"
                      :enter-active-class="`transition-all ease-in ${durationIn}`"
                      enter-to-class="translate-x-0 translate-y-0 opacity-100"
                      leave-from-class="translate-x-0 translate-y-0 opacity-100"
                      :leave-active-class="`transition-all ease-out ${durationOut}`"
                      leave-to-class="opacity-0 leave-to"
                      @before-enter="onBeforeEnter"
                      @after-enter="onAfterEnter"
                      @before-leave="onBeforeLeave"
                      @after-leave="onAfterLeave">
        <slot />
    </transition-group>
    <transition v-else
                appear="appear"
                :mode="mode"
                enter-from-class="opacity-0 enter-from"
                :enter-active-class="`transition-all ease-in ${durationIn}`"
                enter-to-class="translate-x-0 translate-y-0 opacity-100"
                leave-from-class="translate-x-0 translate-y-0 opacity-100"
                :leave-active-class="`transition-all ease-out ${durationOut}`"
                leave-to-class="opacity-0 leave-to"
                @before-enter="onBeforeEnter"
                @after-enter="onAfterEnter"
                @before-leave="onBeforeLeave"
                @after-leave="onAfterLeave">
        <slot />
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { appear, durationIn, durationOut, group, mode } from 'components/transitions/props';

export default defineComponent({
    name: 'UIFadeSlideTransition',

    props: {
        durationIn,
        durationOut,
        appear,
        group,
        mode,

        /**
         * Run transition on the Y axis.
         */
        onYAxis: {
            type: Boolean,
            default: false
        },

        /**
         * Run transition on the X axis.
         */
        onXAxis: {
            type: Boolean,
            default: false
        },

        /**
         * Distance to slide.
         *
         * @default 40px
         */
        distance: {
            type: String,
            default: '40px'
        }
    },

    setup: (props) => {
        const enterFrom = computed(() => {
            if (props.onXAxis && props.onYAxis) {
                return `translateX(${props.distance}) translateY(${props.distance})`;
            }

            if (props.onYAxis) {
                return `translateY(${props.distance})`;
            }

            return `translateX(${props.distance})`;
        });
        const leaveTo = computed(() => {
            const distance = props.distance.at(0) === '-' ? props.distance.slice(1) : '-' + props.distance;

            if (props.onXAxis && props.onYAxis) {
                return `translateX(${distance}) translateY(${distance})`;
            }

            if (props.onYAxis) {
                return `translateY(${distance})`;
            }

            return `translateX(${distance})`;
        });

        const onBeforeEnter = (el: HTMLElement) => {
            el.style.setProperty('--enter-from', enterFrom.value);
        };
        const onAfterEnter = (el: HTMLElement) => {
            el.style.removeProperty('--enter-from');
        };
        const onBeforeLeave = (el: HTMLElement) => {
            el.style.setProperty('--leave-to', leaveTo.value);
        };
        const onAfterLeave = (el: HTMLElement) => {
            el.style.removeProperty('--leave-to');
        };

        return {
            onBeforeEnter,
            onAfterEnter,
            onBeforeLeave,
            onAfterLeave
        };
    }
});
</script>

<style scoped>
.enter-from {
    transform: var(--enter-from);
}
.leave-to {
    transform: var(--leave-to);
}
</style>
