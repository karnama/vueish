import type { Prop } from 'vue';
import { getLibrarySettings } from '@/helpers';
import type { PropType } from 'vue';
import type { Theme } from 'types';
import { themes } from 'types';

/**
 * Boolean flag to indicate if the component
 * should display its loading state.
 *
 * @default false
 */
export const loading: Prop<boolean> = {
    type: Boolean,
    default: false
};

/**
 * Use the spinner loading indicator in the middle of the component instead of other loading indicators.
 *
 * @default false
 */
export const blockingLoader: Prop<boolean> = {
    type: Boolean,
    default: false
};

/**
 * The input label.
 */
export const label: Prop<string> = {
    type: String
};

/**
 * The input's disabled state.
 *
 * @default false
 */
export const disabled: Prop<boolean, false> = {
    type: Boolean,
    default: false
};

/**
 * The input name.
 */
export const name: Prop<string> = {
    type: String,
    required: true
};

/**
 * Replaces the standard HTML autofocus,
 * which only works on page load.
 *
 * @default false
 */
export const autofocus: Prop<boolean, false> = {
    type: Boolean,
    default: false
};

/**
 * The placeholder the input should display.
 *
 * @default undefined
 */
export const placeholder: Prop<string> = {
    type: String
};

/**
 * String to prefix the input with, eg: £.
 *
 * @default undefined
 */
export const prefix: Prop<string> = {
    type: String
};

/**
 * String to suffix the input with, eg: $.
 *
 * @default undefined
 */
export const suffix: Prop<string> = {
    type: String
};

/**
 * Whether the component is clearable or not.
 *
 * @default false
 */
export const clearable: Prop<boolean, false> = {
    type: Boolean,
    default: (): boolean => {
        const clearable = getLibrarySettings()?.clearableByDefault;

        return typeof clearable === 'boolean' ? clearable : false;
    }
};

/**
 * Generic validator for optional numbers higher than 0.
 */
// todo - test in mock component
export const positiveOptionalNumber: Prop<number> = {
    type: Number,
    validator: (val: number): boolean => {
        return typeof val === 'number' ? val > 0 : false;
    }
};

/**
 * Error to display to the user.
 *
 * @default ""
 */
export const error: Prop<string, ''> = {
    type: String,
    default: ''
};

/**
 * @default "default"
 */
export const theme: Prop<string, 'default'> = {
    type: String as PropType<typeof themes[number]>,
    default: 'default',
    validator: (value: Theme): boolean => themes.includes(value)
};

/**
 * Flag indicating that the component should
 * inherit the currentColour, rather than
 * set itself to brand.
 *
 * @default false
 */
export const inheritColor: Prop<boolean, false> ={
    type: Boolean,
    default: false
};

/**
 * Apply the large styles.
 *
 * @default false
 */
export const large: Prop<boolean, false> = {
    type: Boolean,
    default: false
};

/**
 * Apply the small styles.
 *
 * @default false
 */
export const small: Prop<boolean, false> = {
    type: Boolean,
    default: false
};

/**
 * Flag indicating that the loader will run
 * until it's set to false.
 *
 * @default false
 */
export const determinate: Prop<boolean, false> = {
    type: Boolean,
    default: false
};

/**
 * The value indicating where the
 * progress is at currently.
 *
 * @default 0
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
