import { customRef } from 'vue';
import type { Ref } from 'vue';

/**
 * Debounce the value update within the given delay.
 *
 * @param {any} value
 * @param delay
 */
export function debouncedRef<T = unknown>(value: T, delay = 200): Ref<T> {
    let timeout: any;
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
