import type { Prop, PropType } from 'vue';

export type Duration = { enter: number; leave: number };

/**
 * Duration expressed as number of milliseconds in either number format or object format.
 */
export const duration: Prop<Duration | number> = {
    type: [Object, Number] as PropType<Duration | number>,
    default: 200,
    validator: (value: Duration | number): boolean => {
        return typeof value === 'number'
            || typeof value === 'object'
            && typeof value.enter === 'number'
            && typeof value.leave === 'number';
    }
};

/**
 * A class containing a transition timing function controlling
 * how long should the transition last when entering.
 */
export const durationIn: Prop<string> = {
    type: String,
    default: 'duration-200'
};

/**
 * A class containing a transition timing function controlling
 * how long should the transition last when entering.
 */
export const durationOut: Prop<string> = {
    type: String,
    default: 'duration-200'
};

/**
 * Boolean flag indicating to transition on appear.
 */
export const appear: Prop<boolean> = {
    type: Boolean,
    default: false
};

/**
 * Boolean flag to indicate whether the transition
 * should operate in group mode or not.
 *
 * @type {boolean}
 */
export const group: Prop<boolean> = {
    type: Boolean,
    default: false
};

/**
 * The transition mode between elements.
 */
export const mode: Prop<'out-in' | 'in-out'> = {
    type: String as PropType<'out-in' | 'in-out'>,
    default: 'out-in',
    validator: (val: string): boolean => val === 'out-in' || val === 'in-out'
};
