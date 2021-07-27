<template>
    <teleport to="body">
        <div v-if="isOpen"
             class="h-full w-full z-40 fixed top-0 left-0 wrapper"
             :class="{ 'visible': isVisible }">
            <!--Modal overlay-->
            <div class="overlay absolute h-screen w-screen" @click="close('cancel')" />

            <!--Main modal dialog-->
            <UIPanel class="modal top-0 w-full overflow-y-scroll
                            relative bg-default mx-auto shadow-xl rounded bg-white opacity-0 translate-y-0"
                     role="dialog"
                     aria-modal="true"
                     :aria-label="header"
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
                        <button class="clear-icon p-1 m-1 text-gray-500"
                                aria-roledescription="clear"
                                @click="close('cancel')"
                                v-html="clearIcon" />
                    </slot>
                </template>

                <!--Modal Body-->
                <slot>
                    {{ body }}
                </slot>

                <!--Modal Footer-->
                <template #footer>
                    <slot name="footer" :close="close">
                        <UIButton class="ui-modal-close ml-auto mr-2" @click="close('cancel')">
                            {{ closeButtonLabel }}
                        </UIButton>
                        <UIButton category="primary" class="ui-modal-accept" @click="close('accept')">
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
import UIButton from 'components/button/UIButton.vue';
import UIPanel from 'components/panel/UIPanel.vue';
import type { PropType } from 'vue';
import { getIcon } from '@/helpers';

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
         * Callback to execute on modal cancel.
         */
        closeCallback: {
            type: Function as PropType<(callback: () => Promise<void>, accepted: boolean) => Promise<void>>
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

    setup(props, ctx) {
        const clearIcon = getIcon('clear');

        const isOpen = ref(false);
        const isVisible = ref(false);

        const open = async (): Promise<void> => {
            isOpen.value = true;

            return new Promise(resolve => setTimeout(() => {
                isVisible.value = true;
                resolve();
            }, 100));
        };

        const close = async (event: 'accept' | 'cancel' = 'cancel'): Promise<void> => {
            // filter out events if user doesn't define the argument.
            event = ['accept', 'cancel'].includes(event) ? event : 'cancel';

            // Callback to close the modal.
            const closeModal = async (): Promise<void> => {
                isVisible.value = false;
                ctx.emit(event);

                return new Promise(resolve => setTimeout(() => {
                    isOpen.value = false;
                    resolve();
                }, 100));
            };

            if (typeof props.closeCallback === 'function') {
                return props.closeCallback(closeModal, event === 'accept');
            }

            return closeModal();
        };

        return {
            clearIcon,
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
    transition: transform 300ms ease-out, opacity 100ms linear;
}

.wrapper.visible {
    opacity: 1;

    .modal {
        transform: translateY(70px);
        opacity: 1;
    }
}
</style>
