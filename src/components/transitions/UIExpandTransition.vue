<template>
    <!--    <transition-group v-if="group"-->
    <!--                      name="expand"-->
    <!--                      :appear="appear"-->
    <!--                      @enter="enter"-->
    <!--                      @after-enter="afterEnter"-->
    <!--                      @leave="leave"-->
    <!--                      @before-enter="beforeEnter"-->
    <!--                      @before-leave="beforeLeave"-->
    <!--                      @after-leave="afterLeave">-->
    <!--        <slot />-->
    <!--    </transition-group>-->

    <transition
        name="expand"
        :appear="appear"
        :mode="mode"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave">
        <slot />
    </transition>
</template>

<script lang="ts">
import { appear, group, mode } from './props';

export default {
    name: 'UIExpandTransition',

    props: {
        appear,
        group,
        mode
    },

    setup() {
        let height: number;
        const beforeEnter = (element: HTMLElement): void => {
            // console.log('getBoundingClientRect.height', element.getBoundingClientRect().height);
            // console.log('offsetHeight', element.offsetHeight);
            // console.log('scrollHeight', element.scrollHeight);
            // console.log('clientHeight', element.clientHeight);
            // console.log('getComputedStyle', getComputedStyle(element).height);
            // console.log(element);
            // height = element.getBoundingClientRect().height || element.offsetHeight || element.scrollHeight || element.clientHeight || getComputedStyle(element).height;
            // console.log(height);
            element.style.willChange = 'height, opacity';
            requestAnimationFrame(() => {
                // if (!element.style.height) {
                element.style.height = '0px';
                // }
            });
        };
        const enter = (element: HTMLElement): void => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.height = `${element.scrollHeight}px`;
                });
            });
        };
        const afterEnter = (element: HTMLElement): void => {
            element.style.height = '';
            element.style.willChange = '';
        };

        const beforeLeave = (element: HTMLElement): void => {
            height = element.getBoundingClientRect().height || element.offsetHeight || element.scrollHeight || element.clientHeight || getComputedStyle(element).height;
            console.log(height);
            element.style.willChange = 'height, opacity';
            requestAnimationFrame(() => {
                if (!element.style.height) {
                    element.style.height = `${element.offsetHeight}px`;
                }
            });
        };
        const leave = (element: HTMLElement): void => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.height = '0px';
                });
            });
        };
        const afterLeave = (element: HTMLElement): void => {
            element.style.height = '';
            element.style.willChange = '';
        };

        return {
            beforeEnter,
            enter,
            afterEnter,
            beforeLeave,
            leave,
            afterLeave
        };
    }
};
</script>

<style scoped>
/* height comes from js */
.expand-enter-active {
    overflow: hidden;
    transition: height 200ms ease, opacity 200ms ease 200ms;
}

.expand-leave-active {
    overflow: hidden;
    transition: opacity 200ms ease, height 200ms ease 200ms;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
}
</style>
