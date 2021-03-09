import { computed, ref, onMounted, getCurrentInstance } from 'vue';
import type { Ref } from 'vue';

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
 * The placeholder the input should display.
 */
export const placeholder = {
    type: String
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

export const clearable = {
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
 * Make the prop 2-way reactive.
 * You may only replace this value.
 * Interact with it like `.push()` will cause unexpected errors.
 *
 * @param {object} props
 * @param {string} name - the string to append to the emitted event eg.: 'option' will be used for v-model:option=""
 */
export function useVModel<T>(props: Record<string, any>, name = 'modelValue'): Ref<T> {
    const instance = getCurrentInstance();
    if (!instance) {
        return ref() as Ref<T>;
    }

    return computed<T>({
        get() {
            return props[name];
        },
        set(value: T) {
            instance.emit(`update:${name}`, value);
        }
    });
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
