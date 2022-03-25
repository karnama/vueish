import type { HtmlAttribute } from '../../../utils/web-types/web-types';

export default {
    description: 'When an element comes into screen, call the given callback.',
    value: {
        kind: 'expression',
        required: true,
        type: 'IntersectArgument'
    },
    'vue-modifiers': [
        {
            name: 'once',
            description: 'Only trigger the callback once.'
        },
        {
            name: 'idle',
            description: 'Execute the given callback during the browser\'s idle periods.',
            'doc-url': 'https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback'
        },
        {
            name: 'enter',
            description: 'Only run the callback when the entry has appeared on the screen.'
        },
        {
            name: 'leave',
            description: 'Only the callback when the entry has left the screen.'
        }
    ],
    'vue-argument': {
        required: true,
        description: 'The callback or configuration object to adhering to IntersectArgument.'
    }
} as HtmlAttribute;
