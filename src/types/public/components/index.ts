import { StyleType } from '@/types';

// UIBadge
export const horizontal = ['left', 'middle', 'right'] as const;
export const vertical = ['top', 'middle', 'bottom'] as const;

// UIButtonToggle
export type Option = {
    label?: string; // label to use if no slot set
    value: any;
    slot?: string; // name of the slot to use for this option
    category?: StyleType;
};
