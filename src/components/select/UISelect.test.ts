import UISelect from './UISelect.vue';
import { DOMWrapper, mount } from '@vue/test-utils';

const options = [
    {
        id: 1,
        name: 'Bruce Banner'
    },
    {
        id: 2,
        name: 'Bruce Wayne'
    },
    {
        id: 3,
        name: 'Bruce Lee'
    },
    {
        id: 4,
        name: 'Brucie Bonus'
    }
] as const;

const getList = (): DOMWrapper<HTMLDivElement> | null => {
    const element: HTMLDivElement | null = document.querySelector('.list');

    return element ? new DOMWrapper(element) : null;
};

const selectors = {
    currentSelection: '.current-selection',
    selectionClear: '.current-selection .clear-icon',
    list: '.list',
    options: '.option',
    optionClear: '.option .clear-icon'
} as const;

describe('UISelect', () => {
    it('should display the given options when open', async () => {
        const wrapper  = mount(UISelect, {
            props: { options }
        });

        expect(getList()).toBeNull();
        await wrapper.find(selectors.currentSelection).trigger('click');
        const htmlOptions = getList()?.findAll(selectors.options);
        expect(htmlOptions).toHaveLength(options.length);
        expect(htmlOptions![0].html()).toContain(options[0].name);
        wrapper.unmount();
    });

    it('should bind the selection to v-model', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: null
            }
        });

        await wrapper.find(selectors.currentSelection).trigger('click');
        await getList()?.find(selectors.options).trigger('click');
        expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([options[0]]);
        await wrapper.setProps({ modelValue: options [1] });

        const selected = getList()
            ?.findAll(selectors.options)
            .filter(option => option.attributes()['aria-selected'] === 'true');

        expect(selected).toHaveLength(1);
        expect(selected![0].html()).toContain(options[1].name);
        wrapper.unmount();
    });

    it('should allow null value on both single and multi select', async () => {
        const wrapper  = mount(UISelect, {
            props: {
                options,
                modelValue: null
            }
        });

        await wrapper.find(selectors.currentSelection).trigger('click');
        const htmlOptions = getList()?.findAll(selectors.options);

        await htmlOptions![0].trigger('click');
        expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([options[0]]);

        await wrapper.setProps({ multi: true, modelValue: null });
        await htmlOptions![0].trigger('click');
        await htmlOptions![1].trigger('click');

        expect(wrapper.emitted('update:modelValue')[2]).toStrictEqual([options[0], options[1]]);

        wrapper.unmount();
    });

    it('should allow for multiple selection', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                multi: true
            }
        });

        await wrapper.find(selectors.currentSelection).trigger('click');
        const htmlOptions = getList()?.findAll(selectors.options);

        await htmlOptions![0].trigger('click');
        await htmlOptions![1].trigger('click');

        expect(wrapper.emitted('update:modelValue')[1]).toStrictEqual([options[0], options[1]]);
    });

    it.todo('should be able to clear all values');

    it.todo('should be able to clear individual values');

    it.todo('should disable the input given the prop');

    it.todo('should display the given placeholder');

    it.todo('should display the given header when the select is open');

    it.todo('should not allow clearing the value on single select given the prop');

    it.todo('should allow clearing up to one value on multi select given the prop');

    it.todo('should autofocus on the search input given the prop');

    it.todo('should display the names when the input is closed');
});
