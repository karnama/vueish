<template>
    <div>
        <label :for="$attrs.id ?? name" class="cursor-pointer pb-2">
            <slot name="label">{{ label }}</slot>
        </label>
        <div class="toggle-wrapper relative flex">
            <input v-model="model"
                   type="checkbox"
                   :id="$attrs.id ?? name"
                   v-bind="$attrs"
                   class="w-full h-full cursor-pointer opacity-0 m-0 p-0"
                   :disabled="disabled"
                   :name="name">
            <div class="handle" />
            <div class="background bg-gray-200 rounded-full w-full h-full absolute top-0 left-0 z-0" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { name, useVModel, disabled, label } from '@composables/input';

export default defineComponent({
    name: 'UIToggle',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: Boolean
        },

        name,
        label,
        disabled
    },

    setup: (props) => ({ model: useVModel(props) })
});
</script>

<style lang="scss" scoped>
$handleSize: 25;
$width: 53;
$border: 1px solid #E5E5E5;
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
}

.toggle-wrapper {
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
            left: calc(#{$width}px - #{$handleSize}px + 2px);
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
            filter: brightness(150%) saturate(70%);
        }

        & + .handle:before {
            @apply bg-gray-200;
            box-shadow: none;
            border: $border;
        }
    }
}
</style>
