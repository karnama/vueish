import { mount } from '@vue/test-utils';
import UIButtonToggle from './UIButtonToggle.vue';
import type { Option } from '@/types';

const options: Record<string, any>[] = [
    { label: 'Places', value: 'places' },
    { label: 'List', value: 'list' },
    { label: 'Map', value: 'map' }
] as Option[];

describe('UIButtonToggle', () => {
    it('should be able to select options', async () => {
        const wrapper = mount(UIButtonToggle, {
            props: {
                options,
                modelValue: null
            }
        });

        await wrapper.get('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        expect(wrapper.lastEventValue()).toStrictEqual([options[0]]);
    });

    it('should allow for custom names slots', () => {
        const wrapper = mount(UIButtonToggle, {
            props: {
                options: options.map(o => {
                    o.slot = o.value;
                    return o;
                }),
                modelValue: null
            },
            slots: options.reduce((prev, next) => {
                prev[next.value] = 'slotted content';
                return prev;
            }, {})
        });

        const buttons = wrapper.findAll('button');

        expect(buttons).toHaveLength(options.length);

        buttons.forEach(button => {
            expect(button.text()).toBe('slotted content');
        });
    });

    it('should be able to select multiple options given the prop', async () => {
        const wrapper = mount(UIButtonToggle, {
            props: {
                options,
                modelValue: null,
                multi: true
            }
        });

        const buttons = wrapper.findAll('button');

        await buttons[0]!.trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([[options[0]]]);
        await buttons[1]!.trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([[options[0], options[1]]]);
        await buttons[1]!.trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([[options[0]]]);
    });

    it('should be disabled given the prop', async () => {
        const wrapper = mount(UIButtonToggle, {
            props: {
                options,
                modelValue: null,
                disabled: true
            }
        });

        await wrapper.get('button').trigger('click');
        expect(wrapper.lastEventValue()).toBeUndefined();
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should not be clearable by default', async () => {
        const wrapper = mount(UIButtonToggle, {
            props: {
                options,
                modelValue: null
            }
        });

        const button = wrapper.get('button');

        await button.trigger('click');
        await button.trigger('click'); // not emitting if already selected
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);

        console.log(wrapper.vm.model);
        await wrapper.setProps({ clearable: true });
        console.log(wrapper.vm.model);
        await button.trigger('click');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(2);
        expect(wrapper.lastEventValue()).toStrictEqual([null]);
    });

    it('should clear up to a single value on multi select', async () => {
        const wrapper = mount(UIButtonToggle, {
            props: {
                options,
                modelValue: null,
                multi: true
            }
        });

        const buttons = wrapper.findAll('button');

        await buttons[0]!.trigger('click');
        await buttons[1]!.trigger('click');

        expect(wrapper.lastEventValue()).toStrictEqual([[options[0], options[1]]]);

        await buttons[0]!.trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([[options[1]]]);
        await buttons[1]!.trigger('click');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(4);
    });

    it('should be clearable given the prop', async () => {
        const wrapper = mount(UIButtonToggle, {
            props: {
                options,
                modelValue: null,
                clearable: true
            }
        });

        const buttons = wrapper.findAll('button');
        await buttons[0]!.trigger('click');
        await buttons[0]!.trigger('click');

        expect(wrapper.lastEventValue()).toStrictEqual([null]);

        await wrapper.setProps({ multi: true });
        await buttons[0]!.trigger('click');
        await buttons[1]!.trigger('click');

        await buttons[0]!.trigger('click');
        await buttons[1]!.trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([[]]);
    });
});
