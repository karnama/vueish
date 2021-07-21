import { getCurrentInstance } from 'vue';
import type { Icon, Settings } from '@public-types';

/**
 * Get the library settings.
 */
export function getLibrarySettings(): Settings | undefined {
    return getCurrentInstance()?.appContext.config.globalProperties.Vueish;
}

/**
 * Get the specified icon from the settings.
 *
 * @param {string} icon
 */
export function getIcon(icon: Icon): string {
    return getLibrarySettings()!.icons[icon];
}

/**
 * Get the number of float digits.
 *
 * @param {number} num
 */
export function getPrecision(num: number): number {
    if (Number.isInteger(num)) {
        return 0;
    }

    if (isNaN(Number(num))) {
        throw new Error('Expected a number, got: ' + String(num));
    }

    return String(num).split('.')[1].length;
}

/**
 * Ensure the given value is an array.
 *
 * @param {any} value
 */
export function wrap<T>(value?: T | T[]): T[] {
    if (!arguments.length) {
        return [];
    }

    if (!Array.isArray(value)) {
        value = [value] as T[];
    }

    return value;
}
