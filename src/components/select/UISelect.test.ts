import UISelect from './UISelect.vue';
import { DOMWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';

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
    const element = document.querySelector<HTMLDivElement>(selectorMap.list) ;

    return element ? new DOMWrapper(element) : null;
};

const selectorMap = {
    currentSelection: '.current-selection',
    selectionClear: '.current-selection .clear-icon',
    list: '.list',
    options: '.option',
    optionClear: '.option .clear-icon'
} as const;

// todo - remove the manual props when vtu2-rc2 released
describe('UISelect', () => {
    it('should display the given options when open', async () => {
        const wrapper  = mount(UISelect, {
            props: { options }
        });

        expect(getList()).toBeNull();
        await wrapper.find(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);
        expect(htmlOptions).toHaveLength(options.length);
        expect(htmlOptions[0].html()).toContain(options[0].name);
        wrapper.unmount();
    });

    it('should bind the selection to v-model', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: null
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        await getList()!.find(selectorMap.options).trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([options[0]]);
        await wrapper.setProps({ modelValue: options [1] });

        const selected = getList()
            ?.findAll(selectorMap.options)
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

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([options[0]]);

        await wrapper.setProps({ multi: true, modelValue: null });
        await htmlOptions[0].trigger('click');
        await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });
        await htmlOptions[1].trigger('click');

        expect(wrapper.lastEventValue()).toStrictEqual([[options[0], options[1]]]);

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

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });
        await htmlOptions[1].trigger('click');

        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([options[0], options[1]]);
        wrapper.unmount();
    });

    it('should be able to clear all values', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                multi: true
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });

        await wrapper.find(selectorMap.selectionClear).trigger('click');
        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([]);
        wrapper.unmount();
    });

    it('should be able to clear individual values', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                multi: true
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });
        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([options[0]]);

        await htmlOptions[0].find(selectorMap.optionClear).trigger('click');
        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([]);
        wrapper.unmount();
    });

    it('should disable the input given the prop', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                disabled: true
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        expect(getList()).toBeNull();
        wrapper.unmount();
    });

    it('should display the given placeholder', () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                placeholder: 'my-placeholder'
            }
        });

        expect(wrapper.html()).toContain('my-placeholder');
        wrapper.unmount();
    });

    it('should display the given header when the select is open', async () => {
        let wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                header: 'my-header'
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        expect(getList()?.html()).toContain('my-header');
        wrapper.unmount();

        wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: []
            },
            slots: {
                header: '<div id="my-header" />'
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        expect(getList()?.find('#my-header').exists()).toBe(true);
        wrapper.unmount();
    });

    it('should not allow clearing the value on single select given the prop', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                noClear: true
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });
        expect(wrapper.lastEventValue()).toStrictEqual([options[0]]);

        await htmlOptions[0].find(selectorMap.optionClear).trigger('click');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
        wrapper.unmount();
    });

    it('should allow clearing up to one value on multi select given the prop', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                noClear: true,
                multi: true
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });
        await htmlOptions[1].trigger('click');
        await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });

        await htmlOptions[1].find(selectorMap.optionClear).trigger('click');
        await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });
        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([options[0]]);
        await htmlOptions[0].trigger('click');
        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([options[0]]);

        wrapper.unmount();
    });

    it('should autofocus on the search input given the prop', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                autofocus: true
            }
        });

        await nextTick();
        expect(document.activeElement?.getAttribute('name')).toBe('search');
        wrapper.unmount();
    });

    it('should display the names when the input is closed', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                multi: true
            }
        });

        await wrapper.find(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        for await (const option of htmlOptions) {
            await option.trigger('click');
            await wrapper.setProps({ modelValue: wrapper.lastEventValue<unknown[]>()![0] });
        }

        expect(wrapper.html()).toContain(options.map(o => o.name).join(', '));
        wrapper.unmount();
    });
});
