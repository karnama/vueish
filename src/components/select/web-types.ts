import type { HtmlTag } from '../../../utils/web-types/web-types';

export default {
    slots: [
        {
            name: 'option',
            description: 'The list item display slot.',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'vue-properties': [
                { name: 'option', description: 'The option to display.' },
                { name: 'isSelected', description: 'Whether the option is selected or not.' }
            ]
        },
        {
            name: 'placeholder',
            description: 'The slot to customise the placeholder.',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'vue-properties': [
                { name: 'selectionCount', description: 'The number of options currently selected.' }
            ]
        },
        {
            name: 'selected',
            description: 'The slot to customise the current selection.',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'vue-properties': [
                { name: 'selected', description: 'The selected option(s)' }
            ]
        }
    ]
} as HtmlTag;
