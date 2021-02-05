<template>
    <div class="ui-radio-group">
        <span class="text-sm text-gray-500">
            <slot name="label">
                {{ label }}
            </slot>
        </span>

        <div ref="slot"
             class="flex pt-2"
             :class="$attrs.horizontal === undefined ? 'flex-col space-y-4': 'space-x-6'">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { label } from '@composables/input/input';

export default defineComponent({
    name: 'UIRadioGroup',

    props: {
        modelValue: {
            type: [String, Boolean, Number, Object, Array],
            required: true
        },

        label
    },

    emits: ['update:modelValue'],

    setup(props, { emit, attrs }) {
        const slot = ref<HTMLElement>();

        const updateValue = (event: MouseEvent) => {
            emit('update:modelValue', (event.target as HTMLInputElement).value);
        };

        onMounted(() => {
            // Search for radio inputs in the slot
            const inputs = slot.value?.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;

            // Validate they exist
            if (!inputs || inputs.length < 2) {
                throw Error('UIRadioGroup requires at least 2 UIRadios present');
            }

            // Whether any are active
            let active = false;

            // Set the attributes on each one
            inputs.forEach((input: HTMLInputElement) => {
                input.onclick = updateValue;
                input.name = attrs.name as string;
                input.checked = props.modelValue === input.value;
                active = input.checked || active;
                input.disabled = attrs.disabled !== undefined;
            });

            // If none were active, but the input is required, activate the first option
            if (attrs.required !== undefined && !active) {
                inputs[0].click();
            }

            // Update the inputs on external change
            watch(
                () => props.modelValue,
                value => inputs.forEach((input: HTMLInputElement) => input.checked = value === input.value)
            );
        });

        return { slot };
    }
});
</script>
