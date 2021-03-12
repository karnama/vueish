import { StyleType, styleTypes } from '@/types';
import type { Prop, PropType } from 'vue';

export const type: Prop<string, 'default'> = {
    type: String as PropType<typeof styleTypes[number]>,
    default: 'default',
    validator: (value: StyleType): boolean => styleTypes.includes(value)
};

/**
 * Convert numbers and vh/vw values to px values.
 */
export const getPxValue = (value: string | number): number => {
    if (typeof value === 'number') {
        return value;
    }

    if (!isNaN(Number(value))) {
        return Number(value);
    }

    if (value.endsWith('px')) {
        return Number(value.slice(0, -2));
    }

    if (value.endsWith('vw')) {
        return document.documentElement.clientWidth / 100 * Number(value.slice(0, -2));
    }

    if (value.endsWith('vh')) {
        return document.documentElement.clientHeight / 100 * Number(value.slice(0, -2));
    }

    throw new TypeError('Unexpected argument given.');
};
