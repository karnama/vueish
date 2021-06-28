import { computed, getCurrentInstance, capitalize, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { getLibrarySettings } from '@/helpers';

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

/**
 * Whether the component is clearable or not.
 */
export const clearable = {
    type: Boolean,
    default: (): boolean => {
        const clearable = getLibrarySettings()?.clearableByDefault;

        return typeof clearable === 'boolean' ? clearable : false;
    }
};

export const positiveOptionalNumber = {
    type: Number,
    validator: (val?: number): boolean => {
        return val
            ? typeof val === 'number' && val > 0
            : true;
    }
};

/**
 * Error to display to the user.
 */
export const error = {
    type: String,
    default: ''
};

/**
 * Make the prop 2-way reactive.
 *
 * Mutating object literals and array will not trigger an emit
 * therefore, you should always replace the value.
 *
 * @param {object} props
 * @param {string} name - the string to append to the emitted event eg.: 'option' will be used for v-model:option=""
 */
export function useVModel<T>(props: Record<string, any>, name = 'modelValue'): Ref<T> {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error('useVModel must be called from the setup or lifecycle hook methods.');
    }

    const propIsDefined = computed(() => {
        return typeof props[name] !== 'undefined' &&
            (instance.vnode.props?.hasOwnProperty(name) || instance.vnode.props?.hasOwnProperty(capitalize(name)));
    });
    const hasDefaultValue = computed(() => instance.vnode.component?.props.hasOwnProperty(name));

    if (!propIsDefined.value && !hasDefaultValue.value) {
        throw new Error('Attempted to use useVModel without value.');
    }

    const internal = ref(propIsDefined.value ? props[name] : instance.vnode.component!.props[name]) as Ref<T>;

    watch(
        () => internal.value,
        value => instance.emit(`update:${name}`, value),
        { deep: true }
    );

    return computed<T>({
        get() {
            return propIsDefined.value ? props[name]: internal.value;
        },
        set(value: T) {
            internal.value = value;
        }
    });
}
