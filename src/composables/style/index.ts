import { StyleType, styleTypes } from '@/types';
import type { Prop } from 'vue';

export const type: Prop<string, 'default'> = {
    type: String,
    default: 'default',
    validator: (value: StyleType): boolean => styleTypes.includes(value)
};

