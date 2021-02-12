<template>
    <div class="ui-radio-group">
        <span class="label text-sm text-gray-500">
            <slot name="label">
                {{ label }}
            </slot>
        </span>

        <div ref="slot"
             class="slot flex pt-2"
             :class="horizontal ? 'space-x-6': 'flex-col space-y-4'">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { label } from '@composables/input';

export default defineComponent({
    name: 'UIRadioGroup',

    props: {
        modelValue: {
            type: [String, Boolean, Number, Object, Array]
        },

        label,
        disabled: Boolean,
        horizontal: Boolean,
        required: Boolean
    },

    emits: ['update:modelValue'],

    setup(props, { emit, attrs }) {
        const slot = ref<HTMLElement>();

        onMounted(() => {
            // Search for radio inputs in the slot
            const inputs = slot.value?.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;

            // Validate they exist
            if (!inputs || inputs.length < 2) {
                throw Error('UIRadioGroup requires at least 2 UIRadio components present');
            }

            // Set the attributes on each one
            inputs.forEach(input => {
                input.onclick = (event: MouseEvent) =>
                    emit('update:modelValue', (event.target as HTMLInputElement).value);
                input.name = attrs.name as string;
                input.checked = props.modelValue === input.value;
                input.disabled = props.disabled;
            });

            // Only need to set one to the group required status
            inputs[0].required = props.required;

            // Update the inputs on external change
            watch(() => props.modelValue, value => inputs.forEach(input => input.checked = value === input.value));
            watch(() => props.disabled, value => inputs.forEach(input => input.disabled = value));
            watch(() => props.required, value => inputs[0].required = value);
        });

        return { slot };
    }
});
</script>
