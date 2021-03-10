<template>
    <section :id="id"
             class="ui-panel rounded shadow-md bg-default relative transition-all"
             :aria-expanded="open"
             :class="{ 'hover:shadow-lg': !open, 'pointer-events-none select-none': loading && blockingLoader }">
        <UIFadeTransition>
            <UILinearLoader v-if="loading && !blockingLoader" class="absolute rounded-t" />
        </UIFadeTransition>

        <header v-if="hasHeader || $slots.actions"
                class="w-full flex items-center px-12 relative transition-all no-blur"
                :class="{ 'blur': loading && blockingLoader }">
            <h1 class="select-none flex-grow py-8"
                :class="{
                    'cursor-pointer': collapsible,
                }"
                @click="toggle">
                <slot name="header">
                    {{ header }}
                </slot>
            </h1>

            <div v-if="open" class="my-2">
                <slot name="actions" />
            </div>
        </header>

        <UIExpandTransition :appear="appear">
            <keep-alive>
                <div v-cloak
                     v-if="open"
                     class="no-blur"
                     :class="{ 'blur': loading && blockingLoader }">
                    <main class="w-full px-12 py-6 text-gray-700">
                        <slot />
                    </main>

                    <footer v-if="$slots.footer" class="py-8 px-12 flex items-center">
                        <slot name="footer" />
                    </footer>
                </div>
            </keep-alive>
        </UIExpandTransition>

        <UIFadeTransition>
            <div v-if="loading && blockingLoader"
                 class="rounded absolute top-0 left-0 w-full h-full blocking-loader-bg
                        flex justify-center items-center">
                <UISpinnerLoader />
            </div>
        </UIFadeTransition>
    </section>
</template>

<script lang="ts">
import UIFadeTransition from '@components/transitions/UIFadeTransition.vue';
import UIExpandTransition from '@components/transitions/UIExpandTransition.vue';
import UILinearLoader from '@components/loader-linear/UILinearLoader.vue';
import LocalCache from '@/helpers/cache/LocalCache';
import { defineComponent, ref, computed, watch } from 'vue';
import UISpinnerLoader from '@components/loader-spinner/UISpinnerLoader.vue';

let cache: LocalCache;

export default defineComponent({
    name: 'UIPanel',

    components: {
        UISpinnerLoader,
        UIFadeTransition,
        UILinearLoader,
        UIExpandTransition
    },

    props: {
        /**
         * Boolean flag to indicate the panel should start closed.
         */
        closed: {
            type: Boolean,
            default: false
        },

        /**
         * Boolean flag to indicate if the panel is collapsible.
         */
        noCollapse: {
            type: Boolean,
            default: false
        },

        /**
         * Id used for navigation to the portion of the page
         * and as a namespace for saved closed status.
         */
        id: {
            type: String,
            required: false
        },

        /**
         * Boolean flag for transition on appear.
         */
        appear: {
            type: Boolean,
            default: false
        },

        /**
         * Boolean flag to indicate if loader is visible.
         */
        loading: {
            type: Boolean,
            default: false
        },

        /**
         * Use the spinner loading in the middle of the panel instead of the linear loader.
         */
        blockingLoader: {
            type: Boolean,
            default: false
        },

        /**
         * Prop alternative to the header slot.
         */
        header: {
            type: String
        }
    },

    setup(props, ctx) {
        const hasHeader = computed<boolean>(() => !!props.header || !!ctx.slots.header);
        const collapsible = computed(() => hasHeader.value ? !props.noCollapse : false);
        const open = ref(!hasHeader.value || !collapsible.value ? true : !props.closed);
        watch(() => props.closed, () => open.value = !props.closed);

        if (props.id) {
            cache = new LocalCache('panel_' + String(props.id));

            if (collapsible.value) {
                open.value = cache.get<boolean>('isOpen', open.value )!;
            }
        }

        /**
         * Toggle the panel's closed state.
         */
        const toggle = (): void => {
            if (!collapsible.value) {
                return;
            }

            open.value = !open.value;

            if (cache) {
                cache.set('isOpen', open.value);
            }
        };

        return {
            hasHeader,
            open,
            toggle,
            collapsible
        };
    }
});
</script>

<style scoped>
.blocking-loader-bg {
    background-color: rgba(0, 0, 0, 0.1);
}
.no-blur {
    filter: blur(0);
    transition: filter 100ms ease;
}
.blur {
    filter: blur(1px);
    transition: filter 100ms ease;
}
</style>
