import type { HtmlAttribute } from '../../../utils/web-types/web-types';

export default {
    description: 'Show the given content on hover.',
    'vue-modifiers': [
        {
            name: 'top',
            description: 'Show the content to the top of the element.'
        },
        {
            name: 'bottom',
            description: 'Show the content to the bottom of the element.'
        },
        {
            name: 'left',
            description: 'Show the content to the left of the element.'
        },
        {
            name: 'right',
            description: 'Show the content to the right of the element.'
        }
    ]
} as HtmlAttribute;
