import type { Column, Row } from '@components/table/UITableTypes';
import { mount, VueWrapper } from '@vue/test-utils';
import UITable from '@components/table/UITable.vue';
import { snakeCase } from 'lodash-es';
import UIInput from '@components/input/UIInput.vue';
import { nextTick, h } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { orderBy } from 'lodash-es';

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
        letter: 'b',
        number: 2,
        isSelectable: false
    },
    {
        letter: 'c',
        number: 3
    },
    {
        letter: 'a',
        number: 1
    }
];

const selectorMap = {
    search: '#search',
    rows: 'tbody > tr',
    headers: 'thead > tr.hidden.bg-gray-100 > th.py-6.text-left.px-4.uppercase',
    checkboxes: 'tbody > tr > td.px-2 input',
    topCheckbox: 'thead > tr.hidden.bg-gray-100 > th.py-6.px-2 > span.mx-auto input'
} as const;

function titleCase(str: string): string {
    return snakeCase(str) // Title Case
        .split('_')
        .reduce((previous: string, next: string) =>
            previous + ' ' + next.charAt(0).toUpperCase() + next.slice(1));
}

function getLastEventValue(wrapper: VueWrapper<ComponentPublicInstance>) {
    // filter out the checkbox events
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const events = (wrapper.emitted('update:modelValue') as unknown[][])
        .filter(argumentArr => argumentArr.length === 1 && typeof argumentArr[0] !== 'boolean') as Row[][];
    return events[events.length - 1];
}

describe('UITable', () => {
    it('should display the given headers and rows', () => {
        const wrapper = mount(UITable, {
            props: {
                rows,
                headers
            }
        });

        const ths = wrapper.findAll(selectorMap.headers);
        expect(ths).toHaveLength(headers.length);
        headers.forEach(header => {
            const head = header.header ?? titleCase(header.rowProperty);
            expect(ths.map(th => th.text())).toContain(head);
        });

        const trs = wrapper.findAll(selectorMap.rows);
        expect(trs).toHaveLength(rows.length);
        rows.forEach((row, index) => {
            expect(trs[index].text()).toContain(row.number);
        });
        wrapper.unmount();
    });

    it('should figure out the header if not given', () => {
        const wrapper = mount(UITable, {
            props: {
                rows,
                headers
            }
        });

        expect(wrapper.html()).toContain(titleCase(headers[1].rowProperty));
        wrapper.unmount();
    });

    it('should display suffixes and prefixes when given', () => {
        const wrapper = mount(UITable, {
            props: {
                rows,
                headers
            }
        });

        const trs = wrapper.findAll(selectorMap.rows);
        expect(trs).toHaveLength(rows.length);
        rows.forEach((row, index) => {
            expect(trs[index].text()).toContain(String(row.number) + '%');
        });
        wrapper.unmount();
    });

    describe('search', () => {
        it('should only show the relevant rows on search', async () => {
            jest.useFakeTimers();
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    search: true
                }
            });

            const search = wrapper.findComponent(UIInput);
            await search.find('input').setValue('1');
            jest.runAllTimers(); // search is debounced
            await nextTick(); // wait for dom updates

            const searchResults = wrapper.findAll(selectorMap.rows);
            expect(searchResults).toHaveLength(1);
            expect(searchResults[0].text()).not.toContain('2');
            jest.useRealTimers();
            wrapper.unmount();
        });

        it('should search by the provided function if given', async () => {
            jest.useFakeTimers();
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    search: (row: Row, term: string) => String(row.letter) + String(row.number) === term
                }
            });

            const search = wrapper.findComponent(UIInput);
            await search.find('input').setValue('a1');
            jest.runAllTimers(); // search is debounced
            await nextTick(); // wait for dom updates

            const searchResults = wrapper.findAll(selectorMap.rows);
            expect(searchResults).toHaveLength(1);
            jest.useRealTimers();
            wrapper.unmount();
        });
    });

    describe('sorting', () => {
        it('should order the columns by ascending on click', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers
                }
            });

            const trs = wrapper.findAll(selectorMap.rows);

            // prove that they're in the order they were given
            rows.forEach((row, index) => {
                expect(trs[index].text()).toContain(row.letter);
            });

            const th = wrapper.findAll(selectorMap.headers).filter(dw => dw.text() === headers[0].header)[0]; // Letter
            await th.trigger('click');

            const orderedRows = orderBy(rows, ['letter']);
            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(orderedRows[index].letter);
            });
            wrapper.unmount();
        });

        it('should order the columns by descending on two clicks', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers
                }
            });

            // prove that they're in the order they were given
            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(rows[index].letter);
            });

            const th = wrapper.findAll(selectorMap.headers)
                .filter(dw => dw.text() === titleCase(headers[1].rowProperty))[0]; // Number
            await th.trigger('click');
            await th.trigger('click');

            const descOrderedRows = orderBy(rows, ['number'], ['desc']);
            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(descOrderedRows[index].letter);
            });
            wrapper.unmount();
        });

        it('should order the columns as it originally was on three clicks', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers
                }
            });

            // prove that they're in the order they were given
            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(rows[index].letter);
            });

            const th = wrapper.findAll(selectorMap.headers)
                .filter(dw => dw.text() === titleCase(headers[1].rowProperty))[0]; // Number
            await th.trigger('click');
            await th.trigger('click');
            await th.trigger('click');

            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(rows[index].letter);
            });
            wrapper.unmount();
        });

        it('should order the columns with the provided sort function', async () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const sortByFunc = jest.fn((row, _direction) => row.number);
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers: [headers[0], {
                        ...headers[1],
                        sortByFunc
                    }]
                }
            });

            // prove that they're in the order they were given
            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(rows[index].letter);
            });

            const th = wrapper.findAll(selectorMap.headers)
                .filter(dw => dw.text() === titleCase(headers[1].rowProperty))[0]; // Number
            await th.trigger('click');

            let orderedRows = orderBy(rows, ['number']);
            expect(sortByFunc).toHaveBeenCalledTimes(rows.length);
            // partial match as not all attributes are required but in component are hydrated
            expect(sortByFunc).toHaveBeenLastCalledWith(expect.objectContaining(rows[rows.length - 1]));

            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(orderedRows[index].number);
            });

            await th.trigger('click');

            orderedRows = orderBy(rows, ['number'], ['desc']);
            expect(sortByFunc).toHaveBeenLastCalledWith(expect.objectContaining(rows[rows.length - 1]));
            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(orderedRows[index].letter);
            });
            wrapper.unmount();
        });

        it('should disable sorting when prop given', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    noSort: true
                }
            });

            // prove that they're in the order they were given
            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(rows[index].letter);
            });

            const th = wrapper.findAll(selectorMap.headers)
                .filter(dw => dw.text() === titleCase(headers[1].rowProperty))[0]; // Number
            await th.trigger('click');

            // it's still in the same order
            wrapper.findAll(selectorMap.rows).forEach((tr, index) => {
                expect(tr.text()).toContain(rows[index].letter);
            });
            wrapper.unmount();
        });
    });

    describe('selecting', () => {
        it('should v-model selection', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    modelValue: null,
                    selectable: true
                }
            });

            const checkbox = wrapper.find(selectorMap.checkboxes);
            await checkbox.trigger('click');
            await nextTick();

            // first is not selectable
            expect(getLastEventValue(wrapper)[0]).toStrictEqual([expect.objectContaining(rows[1])]);
            wrapper.unmount();
        });

        it('should only allow selecting one row given the prop', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    modelValue: null,
                    selectable: true,
                    singleSelect: true
                }
            });

            const checkboxes = wrapper.findAll(selectorMap.checkboxes);
            await checkboxes[0].trigger('click');
            await nextTick();

            expect(wrapper.lastEventValue<Row[]>()![0].letter).toBe(rows[1].letter); // first is not selectable

            await checkboxes[checkboxes.length - 1].trigger('click');
            await nextTick();

            expect(wrapper.lastEventValue<Row[]>()![0]).not.toBeInstanceOf(Array);
            expect(wrapper.lastEventValue<Row[]>()![0].letter).toBe(rows[rows.length - 1].letter);

            wrapper.unmount();
        });

        it('should v-model multiple selections', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    modelValue: [],
                    selectable: true
                }
            });

            const checkboxes = wrapper.findAll(selectorMap.checkboxes);
            await checkboxes[0].trigger('click');
            await checkboxes[1].trigger('click');

            expect(getLastEventValue(wrapper)[0].map((row: Row) => row.letter)).toStrictEqual(
                rows.filter(row => typeof row.isSelectable === 'boolean' ? row.isSelectable : true)
                    .map(row => row.letter)
            );
        });

        it('should select all on clicking the top checkbox', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    modelValue: [],
                    selectable: true
                }
            });

            await wrapper.find(selectorMap.topCheckbox).trigger('click');

            expect(getLastEventValue(wrapper)[0].map((row: Row) => row.letter)).toStrictEqual(
                rows.filter(row => typeof row.isSelectable === 'boolean' ? row.isSelectable : true)
                    .map(row => row.letter)
            );
        });

        it('should clear the selection first if some are selected when clicking select all', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    modelValue: [],
                    selectable: true
                }
            });

            await wrapper.find(selectorMap.checkboxes).trigger('click');

            expect(getLastEventValue(wrapper)[0]).toHaveLength(1);
            await wrapper.find(selectorMap.topCheckbox).trigger('click');

            expect(getLastEventValue(wrapper)[0]).toHaveLength(0);
            await wrapper.find(selectorMap.topCheckbox).trigger('click');

            expect(getLastEventValue(wrapper)[0]).toHaveLength(
                rows.filter(row => typeof row.isSelectable === 'boolean' ? row.isSelectable : true).length
            );
        });

        it('should not allow selecting a row if row is set to not be selectable', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers,
                    modelValue: [],
                    selectable: true
                }
            });

            await wrapper.find(selectorMap.topCheckbox).trigger('click');

            expect(getLastEventValue(wrapper)[0]).toHaveLength(
                rows.filter(row => typeof row.isSelectable === 'boolean' ? row.isSelectable : true).length
            );
        });
    });

    describe('slots', () => {
        it('should accept footer, empty, action and header slots', async () => {
            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers
                },
                slots: {
                    footer: '<div id="footer-content" />',
                    empty: '<div id="empty-content" />',
                    header: (params) => h('div', { id: params.header.rowProperty }, JSON.stringify(params.header)),
                    action: (params) => h('div', { id: params.row.letter }, JSON.stringify(params.row))
                }
            });

            expect(wrapper.find('#footer-content').exists()).toBe(true);
            headers.forEach(header => {
                // only look for the headers in the thead
                const headerWrapper = wrapper.find(selectorMap.headers + ' #' + header.rowProperty);
                expect(headerWrapper.exists()).toBe(true);

                // it was given the slotProps
                expect(JSON.parse(headerWrapper.text()).rowProperty).toBe(header.rowProperty);
            });
            rows.forEach(row => {
                const actionWrapper = wrapper.find('#' + String(row.letter));
                expect(actionWrapper.exists()).toBe(true);
                expect(JSON.parse(actionWrapper.text()).number).toBe(row.number);
            });

            await wrapper.setProps({ rows: [] });
            expect(wrapper.find('#empty-content').exists()).toBe(true);
            wrapper.unmount();
        });

        it('should dynamically accept slots based on header row property', () => {
            const slots = headers.reduce((
                previous: Record<string, string|((params: Record<string, any>) => ReturnType<typeof h>)>,
                next
            ) => {
                previous[next.rowProperty] = (params) => h(
                    'div',
                    { id: String(next.rowProperty) + '-content' },
                    JSON.stringify(params.row)
                );
                return previous;
            }, {});

            const wrapper = mount(UITable, {
                props: {
                    rows,
                    headers
                },
                slots
            });

            Object.keys(slots).forEach(slot => {
                const rowWrapper = wrapper.find(selectorMap.rows + ' #' + slot + '-content');

                expect(JSON.stringify(rows)).toContain(rowWrapper.text());
            });
            wrapper.unmount();
        });
    });
});