<template>
    <transition-group v-if="group"
                      :appear="appear"
                      :css="false"
                      @enter="enter"
                      @leave="leave">
        <slot />
    </transition-group>

    <transition
        v-else
        :css="false"
        :appear="appear"
        :mode="mode"
        @enter="enter"
        @leave="leave">
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

        const enter = (element: HTMLElement, done: () => void): void => {
            element.style.willChange = 'height, opacity, overflow, transition';
            element.style.opacity = '0';
            const height = getHeight(element);
            const heightDuration = getDuration(props.heightDuration!, 'enter');
            const opacityDuration = getDuration(props.opacityDuration!, 'enter');
            requestAnimationFrame(() => {
                element.style.height = '0px';
                element.style.overflow = 'hidden';
                element.style.transition = `height ${heightDuration}ms ease,`
                    + `opacity ${opacityDuration}ms ease ${heightDuration}ms`;
                requestAnimationFrame(() => {
                    element.style.height = `${height}px`;
                    element.style.opacity = '1';
                    requestAnimationFrame(() => {
                        setTimeout(
                            () => {
                                clearStyles(element);
                                done();
                            },
                            heightDuration + opacityDuration
                        );
                    });
                });
            });
        };

        const leave = (element: HTMLElement, done: () => void): void => {
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
                requestAnimationFrame(() => {
                    element.style.height = '0px';
                    element.style.opacity = '0';
                    requestAnimationFrame(() => {
                        setTimeout(
                            () => {
                                clearStyles(element);
                                done();
                            },
                            heightDuration + opacityDuration
                        );
                    });
                });
            });
        };

        return {
            enter,
            leave
        };
    }
});
</script>
