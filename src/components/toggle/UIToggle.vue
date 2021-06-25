<template>
    <div :class="$attrs.class" :style="$attrs.style">
        <label :for="$attrs.id ?? name"
               class="cursor-pointer text-color font-medium"
               :class="{ 'text-color-error': error || $slots.error }">
            <slot name="label">{{ label }}</slot>
        </label>
        <div class="toggle-wrapper relative rounded-full
                    flex ring-0 ring-red-700 transition"
             :class="{ 'ring-2 mt-1': error || $slots.error }">
            <input :id="$attrs.id ?? name"
                   :checked="model"
                   type="checkbox"
                   v-bind="omit($attrs, ['class', 'style'])"
                   class="w-full h-full cursor-pointer opacity-0 m-0 p-0"
                   :disabled="disabled"
                   :name="name"
                   @change="model = !model">
            <div class="handle" />
            <div class="background rounded-full w-full h-full absolute top-0 left-0 z-0" />
        </div>
        <UIExpandTransition>
            <slot v-if="error || $slots.error" name="error">
                <p class="text-color-error text-sm">
                    {{ error }}
                </p>
            </slot>
        </UIExpandTransition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { name, useVModel, disabled, label, error } from '@composables/input';
import { omit } from 'lodash-es';
import UIExpandTransition from '@components/transitions/UIExpandTransition.vue';

// todo - update design from design chat (border red on error)
export default defineComponent({
    name: 'UIToggle',
    components: { UIExpandTransition },
    inheritAttrs: false,

    props: {
        modelValue: {
            type: Boolean
        },

        name,
        label,
        disabled,
        error
    },

    emits: ['update:modelValue'],

    setup: (props) => {
        const model = useVModel(props);

        return {
            model,
            omit
        };
    }
});
</script>

<style lang="scss" scoped>
$handleSize: 25;
$width: 53;
$border: 1px solid #E5E5E5;
$borderDark: 1px solid #9e9e9e;
$transition: 250ms ease all;

.toggle-wrapper {
    width: #{$width}px;
    height: 26px;
}

input {
    z-index: 50;
    cursor: pointer;
}

.handle {
    z-index: 30;
    transition: $transition;
}

.background {
    z-index: 1;
    pointer-events: none;
    border: $border;
    transition: $transition;
    @apply bg-gray-200;
}

.handle:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: #{$handleSize}px;
    height: #{$handleSize}px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 2px #00000062;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}

input:checked {
    & + .handle:before {
        left: calc(#{$width}px - #{$handleSize}px);
    }

    & ~ .background {
        @apply bg-brand-400;
    }
}

input:disabled {
    cursor: not-allowed;

    & + .handle:before {
        @apply bg-gray-400;
        box-shadow: none;
        border: $border;
    }

    & ~ .background {
        @apply bg-gray-100;
    }
}

input:disabled:checked {
    & ~ .background {
        @apply bg-brand-400;
        filter: brightness(90%) saturate(70%);
    }

    & + .handle:before {
        @apply bg-gray-200;
    }
}

.dark {
    & .background {
        @apply bg-gray-500;
        border: $borderDark;
    }

    & input:disabled {
        & ~ .background {
            @apply bg-gray-300;
        }
        & + .handle:before {
            border: $borderDark;
        }
    }

    & input:disabled:checked {
        & ~ .background {
            @apply bg-brand-400;
            filter: brightness(90%) saturate(70%);
        }

        & + .handle:before {
            @apply bg-gray-300;
        }
    }
}
</style>
