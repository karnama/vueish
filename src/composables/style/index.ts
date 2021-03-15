import { StyleType, styleTypes } from '@/types';
import type { Prop, PropType } from 'vue';

export const type: Prop<string, 'default'> = {
    type: String as PropType<typeof styleTypes[number]>,
    default: 'default',
    validator: (value: StyleType): boolean => styleTypes.includes(value)
};

/**
 * Flag indicating that the loader should
 * inherit the currentColour, rather than
 * set itself to brand.
 */
export const inheritColor: Prop<boolean, false> ={
    type: Boolean,
    default: false
};

/**
 * Apply the large styles.
 */
export const large: Prop<boolean, false> = {
    type: Boolean,
    default: false
};
