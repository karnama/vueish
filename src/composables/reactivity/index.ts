import { customRef, computed, getCurrentInstance, capitalize, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { isEqual } from 'lodash-es';

/**
 * Debounce the value update within the given delay.
 *
 * @param {any} value
 * @param delay
 */
export function debouncedRef<T = unknown>(value: T, delay = 200): Ref<T> {
    let timeout: ReturnType<typeof setTimeout>;
    return customRef<T>((track, trigger) => {
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            }
        };
    });
}

/**
 * Make the prop 2-way reactive.
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
    // if setting undefined as a default value then you're abusing js and this is your own making
    const hasDefaultValue = computed(() => instance.vnode.component?.props[name] !== undefined);

    if (!propIsDefined.value && !hasDefaultValue.value) {
        throw new Error('Attempted to use useVModel without value.');
    }

    let changeFromProps = false;
    const model = ref(propIsDefined.value ? props[name] : instance.vnode.component!.props[name]) as Ref<T>;

    watch(
        () => model.value,
        value => {
            if (!changeFromProps) {
                instance.emit(`update:${name}`, value);
            }

            changeFromProps = false;
        },
        // watch deep so mutations trigger emit
        { deep: true }
    );
    // if the prop changes we need to react
    watch(() => props[name], value => {
        if (isEqual(value, model.value)) return;

        changeFromProps = true;
        model.value = value;
    });

    return model;
}

