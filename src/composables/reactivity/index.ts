import { customRef } from 'vue';
import type { Ref } from 'vue';

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
