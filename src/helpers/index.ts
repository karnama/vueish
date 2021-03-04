import { getCurrentInstance } from 'vue';
import type { Icon, Settings } from '@/types';

/**
 * Get the library settings.
 */
export function getLibrarySettings(): Settings | null {
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
 *
 * @return {number}
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
