<template>
    <section :id="id"
             class="ui-panel rounded shadow-md bg-default relative transition-all"
             :class="{ 'hover:shadow-lg': !open }">
        <UIFadeTransition>
            <UILinearLoader v-if="loading" class="absolute rounded-t" />
        </UIFadeTransition>

        <header v-if="$slots.header || $slots.actions"
                class="w-full flex items-center px-12 relative transition-all">
            <h1 class="select-none flex-grow py-8"
                :class="{
                    'cursor-pointer': collapsible,
                }"
                @click="toggle">
                <slot name="header" />
            </h1>

            <div v-if="open" class="my-2">
                <slot name="actions" />
            </div>
        </header>

        <UIExpandTransition :appear="appear">
            <div v-show="open">
                <main class="w-full px-12 py-6 text-gray-700">
                    <slot />
                </main>

                <footer v-if="$slots.footer" class="py-8 px-12 flex items-center">
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
import LocalCache from '../../helpers/cache/LocalCache';
import { defineComponent, ref, computed, watch } from 'vue';
import type { SetupContext } from 'vue';
import { SetupArg, SetupReturn } from '../../types';

let cache: LocalCache;

//todo - update icon
export default defineComponent({
    name: 'UIPanel',

    components: {
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
        }
    },

    setup(props: SetupArg, ctx: SetupContext): SetupReturn {
        const collapsible = computed(() => ctx.slots.header ? !props.noCollapse : false);
        const open = ref(!ctx.slots.header || !collapsible.value ? true : !props.closed);
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
            open,
            toggle,
            collapsible
        };
    }
});
</script>
