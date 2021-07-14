import type { Prop, PropType, TransitionProps } from 'vue';

/**
 * The duration of the transition
 */
export const duration: Prop<Required<TransitionProps['duration']>> = {
    type: [Object, Number] as PropType<Required<TransitionProps['duration']>>,
    default: 200,
    validator: (value: Required<TransitionProps['duration']>): boolean => {
        return typeof value === 'number'
            || typeof value === 'object'
            && typeof value.enter === 'number'
            && typeof value.leave === 'number';
    }
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
