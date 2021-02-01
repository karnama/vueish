<template>
    <section :id="id"
             class="ui-panel rounded shadow-md bg-default relative transition-all"
             :class="{ 'hover:shadow-lg': !mutableOpen }">
        <UIFadeTransition>
            <UILinearLoader v-if="loading" class="absolute rounded-t" />
        </UIFadeTransition>

        <header v-if="headerShown"
                class="w-full flex items-center px-12 relative transition-all">
            <h1 class="select-none flex-grow py-8"
                :class="{
                    'cursor-pointer': collapsible,
                }"
                @click="toggle">
                <slot name="header" />
            </h1>


            <div v-if="mutableOpen" class="my-2">
                <slot name="actions" />
            </div>
        </header>

        <UIExpandTransition :appear="appear">
            <div v-show="mutableOpen">
                <main class="w-full px-12 py-6 text-base text-gray-700">
                    <slot />
                </main>

                <footer v-if="footerShown" class="py-8 px-12 flex items-center">
                    <slot name="footer" />
                </footer>
            </div>
        </UIExpandTransition>
    </section>
</template>

<script lang="ts">
import UIFadeTransition from '../transitions/UIFadeTransition.vue';
import UIExpandTransition from '../transitions/UIExpandTransition.vue';
import UILinearLoader from '../loader-linear/UILinearLoader.vue';
import LocalCache from '../../helpers/LocalCache';
import { defineComponent, ref, computed, onMounted, onUpdated } from 'vue';
import type { SetupContext } from 'vue';
import { SetupArg, SetupReturn } from '../../types';

let cache: LocalCache;

export default defineComponent({
    name: 'UIPanel',

    components: {
        UIFadeTransition,
        UILinearLoader,
        UIExpandTransition
    },

    props: {
        /**
         * Boolean flag to indicate the panel is open.
         */
        closed: {
            type: Boolean,
            default: false
        },

        /**
         * Boolean flag to indicate if the panel is collapsible.
         */
        nonCollapsible: {
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
        }
    },

    setup(props: SetupArg, ctx: SetupContext): SetupReturn {
        const headerShown = ref(false);
        const footerShown = ref(false);
        const collapsible = computed(() => ctx.slots.header ? !props.nonCollapsible : false);
        const mutableOpen = ref(!ctx.slots.header || !collapsible.value ? true : !!props.closed);

        if (props.id) {
            cache = new LocalCache('panel_' + String(props.id));

            if (collapsible.value) {
                mutableOpen.value = cache.get<boolean>('isOpen', mutableOpen.value )!;
            }
        }

        /**
         * Toggle the panel's closed state.
         */
        const toggle = (): void => {
            if (!collapsible.value) {
                return;
            }

            mutableOpen.value = !mutableOpen.value;

            if (cache) {
                cache.set('isOpen', mutableOpen.value);
            }
        };

        /**
         * Check for slot changes. Doing this allows us to
         * programmatically add and remove the header/footer slots.
         */
        const checkSlots = (): void => {
            headerShown.value = !!ctx.slots.header || !!ctx.slots.actions;
            footerShown.value = !!ctx.slots.footer;
        };

        onMounted(checkSlots);
        onUpdated(checkSlots);

        return {
            headerShown,
            footerShown,
            mutableOpen,
            toggle,
            collapsible
        };
    }
});
</script>
