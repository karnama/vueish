import { getCurrentInstance } from 'vue';
import { DeepPartial, Settings } from '@/main';

export function getLibrarySettings(): DeepPartial<Settings> {
    return getCurrentInstance()!.appContext.config.globalProperties.Vueish;
}
