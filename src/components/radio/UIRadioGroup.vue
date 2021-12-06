<template>
    <div class="ui-radio-group">
        <UIExpandTransition>
            <span v-if="label || $slots.label"
                  class="label text-sm text-gray-500 transition-colors"
                  :class="{ 'text-color-error': error || $slots.error }">
                <slot name="label">
                    {{ label }}
                </slot>
            </span>
        </UIExpandTransition>

        <div ref="slot"
             class="slot flex pt-2"
             role="radiogroup"
             :class="{
                 'space-x-6': horizontal,
                 'flex-col space-y-4': !horizontal,
                 error
             }">
            <slot />
        </div>

        <UIExpandTransition>
            <slot v-if="error || $slots.error" name="error">
                <p class="text-color-error text-sm pt-2">
                    {{ error }}
                </p>
            </slot>
        </UIExpandTransition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUpdate, watch } from 'vue';
import { label, disabled, name, error } from 'composables/input';
import UIExpandTransition from 'components/transitions/UIExpandTransition.vue';

export default defineComponent({
    name: 'UIRadioGroup',

    components: { UIExpandTransition },

    props: {
        modelValue: {
            type: [String, Boolean, Number, Object, Array]
        },

        horizontal: Boolean,
        required: Boolean,
        label,
        disabled,
        name,
        error
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
                throw Error('UIRadioGroup requires at least 2 UIRadio components in the default slot.');
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
                    label.tabIndex = -1;
                } else {
                    label.classList.remove('disabled');
                    label.tabIndex = 0;
                }
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
