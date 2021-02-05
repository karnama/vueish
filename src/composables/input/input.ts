import { onMounted, Ref } from 'vue';

/**
 * The input label.
 */
export const label = {
    type: String
};

/**
 * The input's disabled state.
 */
export const disabled = {
    type: Boolean,
    default: false
};

/**
 * The input name.
 */
export const name = {
    type: String,
    required: true
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
 * Emit an event to clear the input value.
 *
 * @param emit
 * @param clearVal
 */
export function useClearModelValue(
    emit: ((a: 'update:modelValue', ...args: any[]) => void),
    clearVal: any = ''
): () => void {
    return () => emit('update:modelValue', clearVal);
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
