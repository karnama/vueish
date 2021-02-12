<template>
    <div class="ui-radio-group">
        <span class="label text-sm text-gray-500">
            <slot name="label">
                {{ label }}
            </slot>
        </span>

        <div ref="slot"
             class="slot flex pt-2"
             role="radiogroup"
             :class="horizontal ? 'space-x-6': 'flex-col space-y-4'">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate, watch } from 'vue';
import { label, disabled, name } from '@composables/input';

export default defineComponent({
    name: 'UIRadioGroup',

    props: {
        modelValue: {
            type: [String, Boolean, Number, Object, Array]
        },

        label,
        disabled,
        name,
        horizontal: Boolean,
        required: Boolean
    },

    emits: ['update:modelValue'],

    setup(props, ctx) {
        const slot = ref<HTMLDivElement>();
        const watchStopHandlers: ReturnType<typeof watch>[] = [];
        const updateInputs = () => {
            watchStopHandlers.forEach(stop => stop());
            watchStopHandlers.length = 0;

            // Search for radio inputs in the slot
            const inputs = slot.value?.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;

            // Validate they exist
            if (!inputs || inputs.length < 2) {
                throw Error('UIRadioGroup requires at least 2 UIRadio components present.');
            }

            const setChecked = (input: HTMLInputElement) => input.checked = props.modelValue === input.value;
            const setName = (input: HTMLInputElement) => {
                input.name = props.name!;
            };
            const setDisabled = (input: HTMLInputElement) => {
                const disabled = input.hasAttribute('disabled') ? input.disabled : props.disabled;
                const label = input.closest('label')!;
                input.disabled = disabled;

                if (disabled) {
                    label.classList.add('disabled');
                } else {
                    label.classList.remove('disabled');
                }

                label.tabIndex = input.disabled ? -1 : 0;
            };

            watchStopHandlers.push(
                // Update the inputs on props change
                watch(() => props.name, () => inputs.forEach(setName), { immediate: true }),
                watch(() => props.modelValue, () => inputs.forEach(setChecked), { immediate: true }),
                watch(() => props.disabled, () => inputs.forEach(setDisabled), { immediate: true }),
                watch(() => props.required, value => inputs[0].required = value, { immediate: true })
            );

            // Set event listeners
            inputs.forEach(input => {
                input.onclick = () => ctx.emit('update:modelValue', input.value);
                input.closest('label')!.onkeydown = (e: KeyboardEvent) =>
                    e.key !== ' ' || ctx.emit('update:modelValue', input.value);
            });
        };

        onMounted(updateInputs);
        onBeforeUpdate(updateInputs);

        return { slot };
    }
});
</script>
