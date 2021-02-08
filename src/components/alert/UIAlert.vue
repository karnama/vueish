<template>
    <UIFadeTransition>
        <div v-if="visible"
             class="flex justify-between border-t-2 rounded px-4 py-3 shadow-md bg-default z-50"
             :class="`border-${color}`"
             role="alert">
            <div class="flex items-center">
                <span v-if="!noIcon"
                      :class="`mr-4 text-${color}`"
                      aria-hidden="true"
                      v-html="icon" />
                <div>
                    <p v-if="title" class="font-semibold">
                        {{ title }}
                    </p>
                    <p class="break-words hyphens text-sm">
                        <slot>
                            <span v-html="body" />
                        </slot>
                    </p>
                </div>
            </div>
            <div v-if="!sticky" class="ml-4">
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     class="cursor-pointer h-5 w-5 transition-opacity opacity-30 hover:opacity-100"
                     @click="hide">
                    <path stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    </UIFadeTransition>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { types } from '@components/alert/UIAlert';
import { SetupArg } from '@/types';
import UIFadeTransition from '@components/transitions/UIFadeTransition.vue';

export default defineComponent({
    name: 'UIAlert',

    components: { UIFadeTransition },

    props: {
        modelValue: {
            type: Boolean,
            default: true
        },

        /**
         * Should the alert icon be shown.
         */
        noIcon: Boolean,

        /**
         * Should we show the close button.
         */
        sticky: Boolean,

        /**
         * The transition to be used for the alerts.
         */
        transition: {
            type: String,
            validator: function(value) {
                return ['fade'].includes(value);
            }
        },

        /**
         * The alert title.
         */
        title: {
            type: String,
            default: null
        },

        /**
         * The alert body.
         */
        body: {
            type: String,
            default: null
        },

        /**
         * The type of alert (default, primary, etc).
         */
        type: {
            type: String,
            default: 'default',
            validator: function(value) {
                return Object.keys(types).includes(value);
            }
        }
    },

    emits: ['update:modelValue'],

    setup(props: SetupArg, { emit }) {
        const icon = computed(() => types[props.type as string].icon);
        const color = computed(() => types[props.type as string].color);
        const visible = ref(true);

        watch(() => props.modelValue, value => visible.value = value);

        const hide = () => {
            visible.value = false;
            emit('update:modelValue', false);
        };

        const show = () => {
            visible.value = true;
            emit('update:modelValue', true);
        };

        return { icon, color, visible, hide, show };
    }
});
</script>
