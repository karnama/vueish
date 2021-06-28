<template>
    <transition
        name="expand"
        :appear="appear"
        :mode="mode"
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
        },

        /**
         * The transition mode between elements.
         */
        mode: {
            type: String,
            default: 'out-in',
            validator: (val: string): boolean => val === 'out-in' || val === 'in-out'
        }
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setup() {
        const beforeEnter = (element: HTMLElement): void => {
            element.style.willChange = 'height, opacity';
            requestAnimationFrame(() => {
                if (!element.style.height) {
                    element.style.height = '0px';
                }
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
* {
    backface-visibility: hidden;
}

.expand-enter-active {
    overflow: hidden;
    /* fixme: opacity doesn't work at all */
    transition: height 200ms ease, opacity 200ms ease 100ms;
}

.expand-leave-active {
    overflow: hidden;
    transition: opacity 200ms ease, height 200ms ease 200ms;
}

.expand-enter,
.expand-leave-to {
    height: 0;
    opacity: 0;
}
</style>
