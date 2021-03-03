import { getCurrentInstance } from 'vue';
import type { Icon, Settings } from '@/types';

export function getLibrarySettings(): Settings {
    return getCurrentInstance()?.appContext.config.globalProperties.Vueish;
}

export function getIcon(icon: Icon): string {
    return getLibrarySettings().icons[icon];
}

/**
 * Ensure the given value is an array.
 *
 * @param {any} value
 *
 * @return {array};
 */
export function wrap<T>(value?: T | T[]): T[] {
    if (value === undefined) {
        return [];
    }

    if (!Array.isArray(value)) {
        value = [value];
    }

    return value;
}
