import type { HtmlAttribute } from '../../../utils/web-types/web-types';

export default {
    description: 'When the user clicks away from the element call the given callback',
    value: {
        kind: 'expression',
        required: true,
        type: '() => void'
    },
    'vue-modifiers': [
        {
            name: 'stop',
            description: 'Stop the event propagation.'
        },
        {
            name: 'prevent',
            description: 'Prevent the default behaviour.'
        }
    ],
    'vue-argument': {
        required: true,
        description: 'The callback to call when clicking away from the tag.'
    }
} as HtmlAttribute;
