<template>
    <transition
        name="expand"
        :appear="appear"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @before-enter="beforeEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
        <slot />
    </transition>
</template>

<script lang="ts">
export default {
    name: 'UIExpandTransition',
    props: {
        /**
         * Boolean flag for transition on appear.
         */
        appear: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        beforeEnter(element: HTMLElement): void {
            element.style['will-change'] = 'height, opacity';
            requestAnimationFrame(() => {
                if (!element.style.height) {
                    element.style.height = '0px';
                }

                element.style.display = null;
            });
        },

        enter(element: HTMLElement): void {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.height = `${element.scrollHeight}px`;
                });
            });
        },

        afterEnter(element: HTMLElement): void {
            element.style.height = null;
            element.style['will-change'] = null;
        },

        beforeLeave(element: HTMLElement): void {
            element.style['will-change'] = 'height, opacity';
            requestAnimationFrame(() => {
                if (!element.style.height) {
                    element.style.height = `${element.offsetHeight}px`;
                }
            });
        },

        leave(element: HTMLElement): void {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.height = '0px';
                });
            });
        },

        afterLeave(element: HTMLElement): void {
            element.style.height = null;
            element.style['will-change'] = null;
        }
    }
};
</script>

<style scoped>
* {
    backface-visibility: hidden;
}
.expand-enter-active {
    overflow: hidden;
    transition: height 200ms ease, opacity 200ms ease 100ms;
}
.expand-leave-active {
    overflow: hidden;
    transition: height 200ms ease 100ms, opacity 200ms ease;
}

.expand-enter,
.expand-leave-to {
    height: 0;
    opacity: 0;
}
</style>
