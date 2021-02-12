import { getCurrentInstance } from 'vue';
import type { Icon, Settings } from '@/types';

export function getLibrarySettings(): Settings {
    return getCurrentInstance()?.appContext.config.globalProperties.Vueish;
}

export function getIcon(icon: Icon): string {
    return getLibrarySettings().icons[icon];
}
