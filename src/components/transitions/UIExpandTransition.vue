<template>
    <transition-group v-if="group"
                      :appear="appear"
                      @enter="enter"
                      @after-enter="clearStyles"
                      @leave="leave"
                      @before-enter="beforeEnter"
                      @before-leave="beforeLeave"
                      @after-leave="clearStyles">
        <slot />
    </transition-group>

    <transition
        v-else
        :appear="appear"
        :mode="mode"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="clearStyles"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="clearStyles">
        <slot />
    </transition>
</template>

<script lang="ts">
import { appear, group, mode, duration } from './props';
import { defineComponent } from 'vue';
import type { Duration } from './props';

export default defineComponent({
    name: 'UIExpandTransition',

    props: {
        /**
         * Duration expressed as number of milliseconds in either
         * number format or object format
         * for the opacity transition.
         */
        opacityDuration: duration,
        /**
         * Duration expressed as number of milliseconds in either
         * number format or object format
         * for the height transition.
         */
        heightDuration: duration,
        appear,
        group,
        mode
    },

    setup(props) {
        const getHeight = (el: HTMLElement): number => {
            return el.getBoundingClientRect().height || el.scrollHeight || el.offsetHeight || el.clientHeight || 0;
        };
        const getDuration = (duration: Duration | number, type: keyof Duration): number => {
            if (typeof duration === 'number') {
                return duration;
            }

            return duration[type];
        };
        const clearStyles = (element: HTMLElement) => {
            element.style.height = '';
            element.style.overflow = '';
            element.style.transition = '';
            element.style.opacity = '';
            element.style.willChange = '';
        };

        const beforeEnter = (element: HTMLElement): void => {
            element.style.willChange = 'height, opacity, overflow, transition';
            element.style.opacity = '0'; // fixme - here because otherwise it its visible straight away
            const heightDuration = getDuration(props.heightDuration!, 'enter');
            const opacityDuration = getDuration(props.opacityDuration!, 'enter');
            requestAnimationFrame(() => {
                element.style.height = '0px';
                element.style.overflow = 'hidden';
                element.style.transition = `height ${heightDuration}ms ease,`
                    + `opacity ${opacityDuration}ms ease ${heightDuration}ms`;
            });
        };
        const enter = (element: HTMLElement): void => {
            const height = getHeight(element);
            requestAnimationFrame(() => {
                // enter and is applied straight after beforeEnter hence pushing to the following frame
                requestAnimationFrame(() => {
                    element.style.height = `${height}px`;
                    element.style.opacity = '1';
                });
            });
        };

        const beforeLeave = (element: HTMLElement): void => {
            element.style.willChange = 'height, opacity, overflow, transition';
            const height = getHeight(element);
            const heightDuration = getDuration(props.heightDuration!, 'leave');
            const opacityDuration = getDuration(props.opacityDuration!, 'leave');
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.height = `${height}px`;
                element.style.overflow = 'hidden';
                element.style.transition = `opacity ${opacityDuration}ms ease,`
                    + `height ${heightDuration}ms ease ${opacityDuration}ms`;
            });
        };
        const leave = (element: HTMLElement): void => {
            requestAnimationFrame(() => {
                // leave and is applied straight after beforeLeave hence pushing to the following frame
                requestAnimationFrame(() => {
                    element.style.height = '0px';
                    element.style.opacity = '0';
                });
            });
        };

        return {
            beforeEnter,
            enter,
            beforeLeave,
            leave,
            clearStyles
        };
    }
});
</script>
