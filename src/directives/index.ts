import tooltip from './tooltip';
import intersect from './intersect';
import clickAway from './clickAway';
import outerHtml from './outer-html';
import type { Directive } from 'vue';

export default {
    tooltip,
    intersect,
    clickAway,
    outerHtml
} as Record<string, Directive>;
