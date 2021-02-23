import type { Column, Row } from '@components/table/UITableTypes';
import { mount } from '@vue/test-utils';
import UITable from '@components/table/UITable.vue';
import { snakeCase } from 'lodash-es';
import UIText from "@components/text/UIText.vue";

const headers: Readonly<Column[]> = [
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
const rows: Readonly<Row[]> = [
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

const selectorMap = {
    search: '#search'
};

function titleCase(str: string): string {
    return snakeCase(str) // Title Case
        .split('_')
        .reduce((previous: string, next: string) =>
            previous + ' ' + next.charAt(0).toUpperCase() + next.slice(1));
}

describe('UITable', () => {
    it('should display th given headers and rows', () => {
        const wrapper = mount(UITable, {
            props: {
                rows,
                headers
            }
        });

        const ths = wrapper.findAll('th');
        expect(ths).toHaveLength(headers.length);
        headers.forEach(header => {
            const head = header.header ?? titleCase(header.rowProperty);
            expect(ths.map(th => th.text())).toContain(head);
        });
    });

    it('should figure out the header if not given', () => {
        const wrapper = mount(UITable, {
            props: {
                rows,
                headers
            }
        });

        expect(wrapper.html()).toContain(titleCase(headers[1].rowProperty));
    });

    // it('should only show the relevant rows on search', async () => {
    //     jest.useFakeTimers();
    //     const wrapper = mount(UITable, {
    //         props: {
    //             rows,
    //             headers,
    //             search: true
    //         }
    //     });
    //
    //     const search = wrapper.findComponent(UIText);
    //     await search.find('input').setValue('1');
    //     jest.runAllTimers(); // search is debounced
    //     console.log(wrapper.vm.term);
    //
    //     wrapper.findAll('tbody > tr').forEach(wrapper => console.log(wrapper.text()));
    //     expect(wrapper.findAll('tbody > tr')).toHaveLength(1);
    //     jest.useRealTimers();
    // });

    it.todo('should search by the provided function if given');

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
