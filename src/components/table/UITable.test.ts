import type { Column, Row } from '@components/table/UITableTypes';

const columns: Column[] = [
    {
        header: 'Letter',
        rowProperty: 'letter',
        sortable: true,
        prefix: '(',
        suffix: ')'
    },
    {
        rowProperty: 'number',
        sortable: true,
        suffix: '%'
    }
];
const rows: Row[] = [
    {
        letter: 'a',
        number: 1
    },
    {
        letter: 'b',
        number: 2,
        isSelectable: false
    }
];

describe('UITable', () => {
    it.todo('should display th given headers and rows');

    it.todo('should figure out the header if not given');

    it.todo('should only show the relevant rows on search');

    it.todo('should order the columns by ascending on click');

    it.todo('should order the columns by descending on two clicks');

    it.todo('should order the columns with the provided sort function');

    it.todo('should disable sorting when prop given');

    it.todo('should v-model selection');

    it.todo('should v-model multiple selections');

    it.todo('should display suffixes and prefixes when given');

    it.todo('should not allow selecting a row if row is set to not be selectable');

    it.todo('should accept dynamic, footer and header slots');
});
