<template>
    <teleport to="body">
        <div v-if="isOpen"
             class="h-full w-full z-40 fixed top-0 left-0 wrapper"
             :class="{ 'visible': isVisible }">
            <!--Modal overlay-->
            <div class="overlay absolute h-screen w-screen" @click="close('cancel')" />

            <!--Main modal dialog-->
            <UIPanel class="modal overflow-y-scroll relative bg-default m-auto shadow-xl rounded bg-white"
                     v-bind="$attrs"
                     no-collapse>
                <!--Modal Header-->
                <template #header>
                    <slot name="header">
                        {{ header }}
                    </slot>
                </template>

                <!--Modal Close Icon-->
                <template #actions>
                    <slot name="actions">
                        <i class="fa fa-times cursor-pointer text-muted
                    hover:text-default transition-text-color show-on-hover"
                           @click="close('cancel')">close</i>
                    </slot>
                </template>

                <!--Modal Body-->
                <slot>
                    {{ body }}
                </slot>

                <!--Modal Footer-->
                <template #footer>
                    <slot name="footer">
                        <UIButton class="ml-auto mr-2" @click="close('cancel')">
                            {{ closeButtonLabel }}
                        </UIButton>
                        <UIButton type="primary" @click="close('accept')">
                            {{ acceptButtonLabel }}
                        </UIButton>
                    </slot>
                </template>
            </UIPanel>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIButton from '@components/button/UIButton.vue';
import UIPanel from '@components/panel/UIPanel.vue';
import { SetupArg, SetupReturn } from '@/types';

export default defineComponent({
    name: 'UIModal',

    components: {
        UIButton,
        UIPanel
    },

    inheritAttrs: false,

    props: {
        /**
         * Header string
         *
         * @type {String|Object}
         */
        header: {
            type: String
        },

        /**
         * Body string
         *
         * @type {String|Object}
         */
        body: {
            type: String
        },

        /**
         * Callback to execute on modal accept.
         */
        accept: {
            type: Function
        },

        /**
         * Callback to execute on modal cancel.
         */
        cancel: {
            type: Function
        },

        /**
         * The label for the close button.
         *
         * @type {String|Object}
         */
        closeButtonLabel: {
            type: String,
            default: 'Cancel'
        },

        /**
         * The label for the accept button.
         */
        acceptButtonLabel: {
            type: String,
            default: 'Confirm'
        }
    },

    emits: ['cancel', 'accept'],

    setup(props, { emit }): SetupReturn {
        const isOpen = ref(false);
        const isVisible = ref(false);

        const open = async (): Promise<void> => {
            isOpen.value = true;
            return new Promise(resolve => setTimeout(() => { isVisible.value = true; resolve(); }, 100));
        };

        const close = async (event: 'accept' | 'cancel' = 'cancel'): Promise<void> => {
            isVisible.value = false;
            emit(event);

            if (typeof props[event] === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                props[event]();
            }

            return new Promise(resolve => setTimeout(() => { isOpen.value = false; resolve(); }, 100));
        };

        return {
            isOpen,
            isVisible,
            open,
            close
        };
    }
});
</script>

<style scoped lang="scss">
.overlay {
    background: #00000061;
}

.wrapper {
    opacity: 0;
    transition: opacity 200ms linear;
    overflow: hidden;
}

.modal {
    max-width: 700px;
    max-height: 80%;
    width: 100%;
    top: 0;
    transform: translateY(0);
    transition: transform 300ms ease-out, opacity 100ms linear;
    opacity: 0;
}

.wrapper.visible {
    opacity: 1;

    .modal {
        transform: translateY(70px);
        opacity: 1;
    }
}
</style>
