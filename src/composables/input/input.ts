import { onMounted, Ref } from 'vue';
import { Emit } from '@/types';

/**
 * The input label.
 */
export const label = {
    type: String
};

/**
 * Replaces the standard HTML autofocus,
 * which only works on page load.
 */
export const autofocus = {
    type: Boolean,
    default: false
};

/**
 * String to prefix the input with, eg: £.
 */
export const prefix = {
    type: String
};

/**
 * String to suffix the input with, eg: £.
 */
export const suffix = {
    type: String
};

/**
 * Prevents the clear model value option from
 * appearing.
 */
export const noClear = {
    type: Boolean,
    default: false
};

/**
 * Generic one-way value binding.
 */
export const value = {
    type: [String, Boolean, Array, Object, Number],
    required: true
};

/**
 * Emit an event to set the input value.
 *
 * @param emit
 * @param args
 */
export function updateModelValue(emit: Emit, ...args: any): void {
    emit('update:modelValue', ...args);
}

/**
 * Configure the input to use autofocus.
 *
 * @param {boolean} autofocus
 * @param {Ref?} input
 */
export function autofocusElement(autofocus: boolean, input: Ref<HTMLInputElement | undefined>): void {
    if (input && autofocus) {
        onMounted(() => {
            if (input.value) {
                input.value.focus();
            }
        });
    }
}
