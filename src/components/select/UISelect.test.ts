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

const stringOptions = [
    'Foo',
    'Bar',
    'Baz'
] as const;

const getList = (): DOMWrapper<HTMLDivElement> | null => {
    const element = document.querySelector<HTMLDivElement>(selectorMap.list);

    return element ? new DOMWrapper(element) : null;
};

const selectorMap = {
    currentSelection: '.current-selection',
    selectionClear: '.current-selection .clear-icon',
    list: '.ui-list',
    options: '.option',
    optionClear: '.option .clear-icon',
    search: '[name="search"]',
    selectAllBtn: '.x-select-all',
    selectNoneBtn: '.x-select-none'
} as const;

describe('UISelect', () => {
    describe('display', () => {
        it('should display correctly', async () => {
            const wrapper  = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: null
                }
            });

            await wrapper.find(selectorMap.currentSelection).trigger('click');
            expect(getList()!.element).toMatchSnapshot();
            wrapper.unmount();
        });

        it('should display the given options when open', async () => {
            const wrapper  = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: null
                }
            });

            expect(getList()).toBeNull();
            await wrapper.get(selectorMap.currentSelection).trigger('click');
            const htmlOptions = getList()!.findAll(selectorMap.options);
            expect(htmlOptions).toHaveLength(options.length);
            expect(htmlOptions[0].html()).toContain(options[0].name);
            wrapper.unmount();
        });

        it('should display the given string options when open', async () => {
            const wrapper  = mount(UISelect, {
                props: {
                    options: stringOptions,
                    name: 'select',
                    modelValue: null
                }
            });

            expect(getList()).toBeNull();
            await wrapper.get(selectorMap.currentSelection).trigger('click');
            const htmlOptions = getList()!.findAll(selectorMap.options);
            expect(htmlOptions).toHaveLength(stringOptions.length);
            expect(htmlOptions[0].html()).toContain(stringOptions[0]);
            wrapper.unmount();
        });

        it('should display the given placeholder', () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
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
                    name: 'select',
                    modelValue: [],
                    header: 'my-header'
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');
            expect(getList()?.html()).toContain('my-header');
            wrapper.unmount();

            wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: []
                },
                slots: {
                    header: '<div id="my-header" />'
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');
            expect(getList()?.find('#my-header').exists()).toBe(true);
            wrapper.unmount();
        });
    });

    it('should bind the selection to v-model', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: null,
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        await getList()!.get(selectorMap.options).trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([options[0]]);

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        const selected = getList()!.findAll(selectorMap.options)
            .filter(option => option.attributes()['aria-selected'] === 'true');

        expect(selected).toHaveLength(1);
        expect(selected[0].text()).toContain(options[0].name);
        wrapper.unmount();
    });

    it('should bind the selected string option to v-model', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options: stringOptions,
                modelValue: null,
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        await getList()!.get(selectorMap.options).trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([stringOptions[0]]);

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        const selected = getList()!.findAll(selectorMap.options)
            .filter(option => option.attributes()['aria-selected'] === 'true');

        expect(selected).toHaveLength(1);
        expect(selected[0].text()).toContain(stringOptions[0]);
        wrapper.unmount();
    });

    it('should close the list on selection on single select an option', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: null,
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        await getList()!.get(selectorMap.options).trigger('click');
        expect(getList()).toBeNull();
        wrapper.unmount();
    });

    it('should allow null value on both single and multi select', async () => {
        const wrapper  = mount(UISelect, {
            props: {
                options,
                modelValue: null,
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([options[0]]);

        await wrapper.setProps({ multi: true, modelValue: null });
        await htmlOptions[0].trigger('click');
        await htmlOptions[1].trigger('click');

        expect(wrapper.lastEventValue()).toStrictEqual([[options[0], options[1]]]);

        wrapper.unmount();
    });

    it('should allow for multiple selection', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                multi: true
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        await htmlOptions[1].trigger('click');

        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([options[0], options[1]]);
        wrapper.unmount();
    });

    it('should be able to clear all values', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                multi: true,
                clearable: true
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');

        await wrapper.get(selectorMap.selectionClear).trigger('click');
        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([]);
        wrapper.unmount();
    });

    it('should be able to clear individual values', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                multi: true,
                clearable: true
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        await htmlOptions[0].trigger('click');
        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([options[0]]);

        await htmlOptions[0].get(selectorMap.optionClear).trigger('click');
        expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([]);
        wrapper.unmount();
    });

    it('should disable the input given the prop', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                disabled: true
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        expect(getList()).toBeNull();
        wrapper.unmount();
    });

    describe('clearable', () => {
        it('should not allow clearing the value on single select given the prop', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');

            await getList()!.get(selectorMap.options).trigger('click');
            expect(wrapper.lastEventValue()).toStrictEqual([options[0]]);

            await wrapper.get(selectorMap.currentSelection).trigger('click');

            expect(getList()!.find(selectorMap.optionClear).exists()).toBe(false);
            wrapper.unmount();
        });

        it('should allow clearing up to one value on multi select given the prop', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                    multi: true
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');
            const htmlOptions = getList()!.findAll(selectorMap.options);

            await htmlOptions[0].trigger('click');
            await htmlOptions[1].trigger('click');

            await htmlOptions[1].get(selectorMap.optionClear).trigger('click');
            expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([options[0]]);
            await htmlOptions[0].trigger('click');
            expect(wrapper.lastEventValue<unknown[]>()![0]).toStrictEqual([options[0]]);

            wrapper.unmount();
        });

        it('should not display the clear icon on single select', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: []
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');

            const list = getList()!;
            await list.get(selectorMap.options).trigger('click');
            expect(list.html()).not.toContain('clear-icon');
            wrapper.unmount();
        });

        it('should only display the clear icon on multiselect when more than one option selected', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                    multi: true
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');

            const list = getList()!;
            const selectOptions = list.findAll(selectorMap.options);

            await selectOptions[0]!.trigger('click');
            expect(list.html()).not.toContain('clear-icon');
            await selectOptions[1]!.trigger('click');
            expect(list.html()).toContain('clear-icon');
            wrapper.unmount();
        });
    });

    it('should autofocus on the search input given the prop', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                autofocus: true,
                name: 'select'
            }
        });

        await nextTick();
        expect(document.activeElement?.getAttribute('name')).toBe('search');
        wrapper.unmount();
    });

    it('should not be searchable given the prop', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');

        const list = getList()!;
        expect(list.find(selectorMap.search).exists()).toBe(true);
        await wrapper.setProps({ noSearch: true });
        expect(list.find(selectorMap.search).exists()).toBe(false);
        wrapper.unmount();
    });

    it('should display the names when the input is closed', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                multi: true
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        for await (const option of htmlOptions) {
            await option.trigger('click');
        }

        expect(wrapper.html()).toContain(options.map(o => o.name).join(', '));
        wrapper.unmount();
    });

    it('should display the string options when the input is closed', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options: stringOptions,
                modelValue: [],
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                multi: true
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        const htmlOptions = getList()!.findAll(selectorMap.options);

        for await (const option of htmlOptions) {
            await option.trigger('click');
        }

        expect(wrapper.html()).toContain(stringOptions.join(', '));
        wrapper.unmount();
    });

    describe('keyboard events', () => {
        it('should open the list on space down when focused', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: []
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('keydown', { key: 'space' });
            expect(getList()).not.toBeNull();
            wrapper.unmount();
        });

        it('should focus the first element on arrow down key when select isn\'t searchable', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    noSearch: true,
                    modelValue: []
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('keydown', { key: 'space' });
            await wrapper.get(selectorMap.currentSelection).trigger('keydown', { key: 'down' });
            expect(document.activeElement?.isSameNode(getList()!.findAll('ul')[0].element.firstElementChild))
                .toBe(true);
            wrapper.unmount();
        });

        it('should focus not the first element on arrow down key when select is searchable', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: []
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('keydown', { key: 'space' });
            await wrapper.get(selectorMap.currentSelection).trigger('keydown', { key: 'down' });
            expect(document.activeElement?.isSameNode(getList()!.findAll('ul')[0].element.firstElementChild))
                .toBe(false);
            wrapper.unmount();
        });

        // elements don't have event listeners only tabindexes
        it.todo('should focus the next element on tab'
        //     , async () => {
        //     const wrapper = mount(UISelect, {
        //         props: {
        //             options,
        //             modelValue: [],
        //             multi: true
        //         }
        //     });
        //
        //     await wrapper.get(selectorMap.currentSelection).trigger('click');
        //
        //     const search = getList()!.get(selectorMap.search);
        //     expect(search.element.isSameNode(document.activeElement)).toBe(true);
        //     const htmlOption = getList()!.get(selectorMap.options);
        //     await search.trigger('keydown', { keyCode: 9, key: 'Tab', code: 'Tab' });
        //
        //     expect(document.activeElement?.outerHTML).toBe(htmlOption.html());
        //     wrapper.unmount();
        // }
        );

        it('should focus the previous element on key up if possible', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    multi: true
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');
            const htmlOptions = getList()!.findAll<HTMLDivElement>(selectorMap.options);
            htmlOptions[1].element.focus();
            await htmlOptions[1].trigger('keydown', { keycode: 38, key: 'up' });

            expect(document.activeElement?.outerHTML).toBe(htmlOptions[0].html());

            await htmlOptions[0].trigger('keydown', { keycode: 38, key: 'up' });

            expect(document.activeElement?.outerHTML).toBe(htmlOptions[0].html());
            wrapper.unmount();
        });

        it('should focus the next element on key down if possible', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    multi: true
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');
            const htmlOptions = getList()!.findAll<HTMLDivElement>(selectorMap.options);
            const lastIndex = htmlOptions.length - 1;
            htmlOptions[lastIndex - 1].element.focus();
            await htmlOptions[lastIndex - 1].trigger('keydown', { keycode: 40, key: 'down' });

            expect(document.activeElement?.outerHTML).toBe(htmlOptions[lastIndex].html() );

            await htmlOptions[lastIndex].trigger('keydown', { keycode: 40, key: 'down' });

            expect(document.activeElement?.outerHTML).toBe(htmlOptions[lastIndex].html() );
            wrapper.unmount();
        });

        it('should close the list on esc keydown', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');
            expect(getList()).not.toBeNull();

            const currentFocus = new DOMWrapper(document.activeElement!);
            await currentFocus.trigger('keydown', { key: 'esc' });

            expect(getList()).toBeNull();
            wrapper.unmount();
        });

        it('should select an option on enter keydown', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');
            const htmlOption = getList()!.find<HTMLDivElement>(selectorMap.options);

            await htmlOption.trigger('keydown', { key: 'enter' });
            expect(wrapper.lastEventValue()).toStrictEqual([options[0]]);
            wrapper.unmount();
        });
    });

    it('should close the list when clicking away from list', async () => {
        const wrapper = mount(UISelect, {
            props: {
                options,
                modelValue: [],
                name: 'select',
                'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                multi: true
            }
        });

        await wrapper.get(selectorMap.currentSelection).trigger('click');
        expect(getList()).not.toBeNull();
        await wrapper.get(selectorMap.currentSelection).trigger('click');
        expect(getList()).toBeNull();
        wrapper.unmount();
    });

    describe('quick selection', () => {
        it('should select all if non or some are selected', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    multi: true
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');

            const list = getList()!;
            await list.get(selectorMap.selectAllBtn).trigger('click');
            expect(wrapper.lastEventValue()).toStrictEqual([options]);

            await wrapper.setProps({ modelValue: [] });
            await list.get(selectorMap.options).trigger('click');
            await list.get(selectorMap.selectAllBtn).trigger('click');
            expect(wrapper.lastEventValue()).toStrictEqual([options]);
            wrapper.unmount();
        });

        it('should select none if some or all are selected', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: options,
                    multi: true,
                    clearable: true
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');

            const list = getList()!;
            await list.get(selectorMap.selectNoneBtn).trigger('click');
            expect(wrapper.lastEventValue()).toStrictEqual([[]]);

            await wrapper.setProps({ modelValue: options });
            await list.get(selectorMap.options).trigger('click');
            await list.get(selectorMap.selectNoneBtn).trigger('click');
            expect(wrapper.lastEventValue()).toStrictEqual([[]]);
            wrapper.unmount();
        });

        it('should only be available when multi selection has been set', async () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    name: 'select',
                    modelValue: [],
                    multi: false,
                    clearable: true
                }
            });

            await wrapper.get(selectorMap.currentSelection).trigger('click');

            const list = getList()!;
            expect(list.find(selectorMap.selectNoneBtn).exists()).toBe(false);
            expect(list.find(selectorMap.selectAllBtn).exists()).toBe(false);

            await wrapper.setProps({ multi: true });
            await nextTick();
            await wrapper.setProps({ modelValue: [ options[0] ] });
            await nextTick();
            expect(list.find(selectorMap.selectNoneBtn).exists()).toBe(true);
            expect(list.find(selectorMap.selectAllBtn).exists()).toBe(true);
            wrapper.unmount();
        });
    });

    describe('slots', () => {
        it('should display the placeholder even if selected is customised', () => {
            const wrapper = mount(UISelect, {
                props: {
                    options,
                    modelValue: [],
                    name: 'select',
                    placeholder: 'my-placeholder',
                    'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue }),
                    multi: true
                },
                slots: {
                    selected: `<template #selected="{ selected }">
                                   {{ selected }}
                               </template>`
                }
            });

            expect(wrapper.find(selectorMap.currentSelection).html()).toContain('my-placeholder');

            wrapper.unmount();
        });
    });
});
