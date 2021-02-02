import { onMounted, ref, Ref } from 'vue';

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
 * Emit an event to clear the input value.
 *
 * @param emit
 */
export function useClearModelValue(emit: (a: string, b: any) => void): () => void {
    return () => emit('update:modelValue', '');
}

/**
 * Bound value.
 *
 * TODO: When exported from setup the usage in the template cannot find the prop.
 */
export function useModelProp(type: NumberConstructor | StringConstructor | BooleanConstructor): any {
    return {
        modelValue: {
            type,
            required: true
        }
    };
}

/**
 * Configure the input to use autofocus.
 *
 * @param {boolean} autofocus
 * @param {Ref?} input
 */
export function useAutofocus(autofocus: boolean, input?: Ref): Ref {
    if (!input) {
        input = ref<HTMLInputElement | null>(null);
    }

    if (autofocus) {
        onMounted(() => {
            // @ts-expect-error
            if (input.value) {
                // @ts-expect-error
                input.value.focus();
            }
        });
    }

    return input;
}
