import tooltip from './tooltip';
import intersect from './intersect';
import clickAway from './clickAway';
import type { Directive } from 'vue';

export default {
    tooltip,
    intersect,
    clickAway
} as Record<string, Directive>;
