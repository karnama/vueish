import { mount } from '@vue/test-utils';
import UIToggle from './UIToggle.vue';

describe('UIToggle', () => {
    it('should display correctly', () => {
        const wrapper = mount(UIToggle, {
            props: {
                name: 'name'
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should toggle the input with click', async () => {
        const wrapper = mount(UIToggle, {
            props: {
                name: 'name'
            }
        });

        await wrapper.find('input').trigger('change');
        expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual([true]);
        await wrapper.find('input').trigger('change');
        expect(wrapper.emitted('update:modelValue')![1]).toStrictEqual([false]);
    });

    it('should disable input on given prop', async () => {
        const wrapper = mount(UIToggle, {
            props: {
                name: 'name'
            }
        });

        await wrapper.find('input').trigger('change');
        expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual([true]);
        await wrapper.setProps({ disabled: true });
        await wrapper.find('input').trigger('change');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    });

    it('should display the label when given as a prop', () => {
        const wrapper = mount(UIToggle, {
            props: {
                name: 'name',
                label: 'my-label'
            }
        });

        expect(wrapper.html()).toContain('my-label');
    });

    it('should display the label when given as a slot', () => {
        const wrapper = mount(UIToggle, {
            props: {
                name: 'name'
            },
            slots: {
                label: 'my-label'
            }
        });

        expect(wrapper.html()).toContain('my-label');
    });
});
