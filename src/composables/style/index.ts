import { StyleType, styleTypes } from '@/types';
import type { Prop, PropType } from 'vue';

export const type: Prop<string, 'default'> = {
    type: String as PropType<typeof styleTypes[number]>,
    default: 'default',
    validator: (value: StyleType): boolean => styleTypes.includes(value)
};

/**
 * Apply the large styles.
 */
export const large: Prop<boolean, false> = {
    type: Boolean,
    default: false
};
