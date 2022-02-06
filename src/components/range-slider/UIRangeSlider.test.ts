import { mount } from '@vue/test-utils';
import { h } from 'vue';
import UIRangeSlider from './UIRangeSlider.vue';

describe('UIRangeSlider', () => {
    it('should display correctly', () => {
        const wrapper = mount(UIRangeSlider, {
            props: {
                modelValue: 50,
                label: 'my-label',
                name: 'slider'
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });
    it('should display the label when given as prop', () => {
        const wrapper = mount(UIRangeSlider, {
            props: {
                modelValue: 50,
                label: 'my-label',
                name: 'slider'
            }
        });

        expect(wrapper.text()).toContain('my-label');
    });

    it('should display the label when given as slot', () => {
        const wrapper = mount(UIRangeSlider, {
            props: {
                modelValue: 50,
                name: 'slider'
            },
            slots: {
                label: (props) => h('div', { id: 'my-label' }, props.value as string)
            }
        });

        expect(wrapper.find('#my-label').text()).toBe('50');
    });

    it('should be disabled given the prop', async () => {
        const wrapper = mount(UIRangeSlider, {
            props: {
                label: 'my-label',
                name: 'slider',
                modelValue: 50
            }
        });

        await wrapper.find('input').setValue(75);
        expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual(['75']);
        await wrapper.setProps({ disabled: true });
        await wrapper.find('input').setValue(0);
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    });
});
