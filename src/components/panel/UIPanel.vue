<template>
    <section :id="id"
             class="ui-panel rounded shadow-md bg-default relative"
             :class="{
                 'open': mutableOpen,
                 'closed hover:shadow-lg': !mutableOpen,
                 collapse: collapsible
             }">
        <UIFadeTransition>
            <UILinearLoader v-if="loading" determinate class="absolute rounded-t" />
        </UIFadeTransition>

        <header v-if="showHeader"
                class="w-full flex items-center py-8 px-12 relative">
            <h1 class="select-none flex-grow"
                :class="{
                    'cursor-pointer': collapsible,
                }"
                @click="toggleOpen">
                <slot name="header" />
            </h1>

            <div v-if="mutableOpen">
                <slot name="actions" />
            </div>
        </header>

        <ExpandTransition :appear="appear">
            <div v-show="mutableOpen">
                <main class="w-full px-12 py-6">
                    <slot class="text-gray-700 text-base" />
                </main>

                <footer v-if="showFooter" class="py-8 px-12 flex items-center">
                    <slot name="footer" />
                </footer>
            </div>
        </ExpandTransition>
    </section>
</template>

<script lang="ts">
import ExpandTransition from '../transitions/UIExpandTransition';
import UILinearLoader from '../loader-linear/UILinearLoader';
import UIFadeTransition from '../transitions/UIFadeTransition';
import Cache from '../../classes/Cache';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UIPanel',
    components: {
        UIFadeTransition,
        UILinearLoader,
        ExpandTransition
    },

    props: {
        /**
         * Boolean flag to indicate the panel is open.
         *
         * @type {boolean|Object}
         */
        open: {
            type: Boolean,
            default: true
        },

        /**
         * Boolean flag to indicate if the panel is collapsible.
         *
         * @type {boolean|Object}
         */
        collapsible: {
            type: Boolean,
            default: true
        },

        /**
         * Id used for navigation to the portion of the page
         * and as a namespace for saved closed status.
         *
         * @type {string|Object}
         */
        id: {
            type: String,
            required: false
        },

        /**
         * Boolean flag for transition on appear.
         *
         * @type {boolean|Object}
         */
        appear: {
            type: Boolean,
            default: false
        },

        /**
         * Boolean flag to indicate if loader is visible.
         *
         * @type {boolean|Object}
         */
        loading: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            /**
             * Boolean flag to show the header based on slot content.
             *
             * @type {boolean}
             */
            showHeader: false,
            /**
             * Boolean flag to show the footer based on slot content.
             *
             * @type {boolean}
             */
            showFooter: false,
            /**
             * The internal, mutable, open flag.
             *
             * @type {boolean}
             */
            mutableOpen: this.open,
            /**
             * The cache instance.
             *
             * @type {Cache}
             */
            cache: null
        };
    },

    beforeMount() {
        if (this.id) {
            this.cache = new Cache('panel_' + this.id);
            this.mutableOpen = this.cache.get('isOpen', this.mutableOpen);
        }
    },

    mounted() {
        this.checkSlots();
    },

    updated() {
        this.checkSlots();
    },

    methods: {
        /**
         * Open the panel.
         */
        setOpen() {
            if (this.cache) {
                this.cache.set('isOpen', true);
            }
            this.mutableOpen = true;
        },

        /**
         * Close the panel.
         */
        setClosed() {
            if (this.cache) {
                this.cache.set('isOpen', false);
            }
            this.mutableOpen = false;
        },

        /**
         * Toggle the panel.
         */
        toggleOpen() {
            if (!this.collapsible) {
                return;
            }
            this.mutableOpen ? this.setClosed() : this.setOpen();
        },

        /**
         * Check for slot changes. Doing this allows us to
         * programmatically add and remove the header/footer slots.
         */
        checkSlots() {
            this.showHeader = !!this.$slots.header;
            this.showFooter = !!this.$slots.footer;
        }
    }
});
</script>

<style lang="scss">
.ui-panel {
    main > * + * {
        margin-top: 24px;
    }
    > main {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }
    > header + main {
        padding-top: 0;
    }
    .show-on-hover {
        opacity: 0;
        transition: opacity 100ms linear;
    }
    &:hover header .show-on-hover {
        opacity: 1;
    }
}
</style>
