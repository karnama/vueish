import type { StyleType } from '@public-types';
import { styleTypes } from '@public-types';
import type { Prop, PropType } from 'vue';

export const category: Prop<string, 'default'> = {
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

/**
 * Flag indicating that the loader will run
 * until it's set to false.
 */
export const determinate: Prop<boolean, false> = {
    type: Boolean,
    default: false
};

/**
 * The value indicating where the
 * progress is at currently.
 */
export const progress: Prop<number, 0> = {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0
};

/**
 * The number of steps to complete from 0 to completion.
 */
export const steps: Prop<number|string> = {
    type: [Number, String],
    validator: (value: number) => Number(value) >= 2
};

/**
 * Convert numbers and vh/vw/rem values to px values.
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

    if (value.endsWith('rem')) {
        return Number(value.slice(0, -3)) * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    throw new TypeError('Unexpected argument given.');
};
