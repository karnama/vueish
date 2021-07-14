import { mount } from '@vue/test-utils';
import UITextarea from './UITextarea.vue';

describe('UITextarea', () => {
    it('should display correctly', () => {
        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name: 'input'
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should handle model-binding correctly', async () => {
        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name: 'input'
            }
        });

        await wrapper.get('textarea').setValue('Hello World');

        expect(wrapper.emitted('update:modelValue')).not.toBeUndefined();
        expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual(['Hello World']);
    });

    it('should be enabled by default', () => {
        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name: 'input'
            }
        });

        expect(wrapper.get('textarea').attributes().disabled).toBeUndefined();
    });

    it('should be disabled when the prop is provided', async () => {
        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name: 'input',
                disabled: false
            }
        });

        const input = wrapper.get('textarea');

        expect(input.attributes().disabled).toBeUndefined();
        await wrapper.setProps({ disabled: true });
        expect(input.attributes().disabled).not.toBeUndefined();
    });

    it('should prevent resize when the fixed prop is given', async () => {
        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name: 'input',
                fixed: false
            }
        });

        const input = wrapper.get('textarea');

        expect(input.element.style.resize).toBe('');
        await wrapper.setProps({ fixed: true });
        expect(input.element.style.resize).toBe('none');
    });

    it('should prevent resize when the autoSize prop is given', async () => {
        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name: 'input'
            }
        });

        const input = wrapper.get('textarea');

        expect(input.element.style.resize).toBe('');
        await wrapper.setProps({ autoSize: true });
        expect(input.element.style.resize).toBe('none');
    });

    it('should correctly assign the name prop', () => {
        const name = 'input';

        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name
            }
        });

        const input = wrapper.get('textarea');
        const label = wrapper.get('label');

        expect(input.attributes().id).toBe(name);
        expect(input.attributes().name).toBe(name);
        expect(label.attributes().for).toBe(name);
    });

    it('should correctly display the label when passed as a prop', () => {
        const label = 'text';

        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name: 'input',
                label
            }
        });

        expect(wrapper.get('label').text()).toBe(label);
    });

    it('should autofocus on the input when the prop is provided', () => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);

        const wrapper = mount(UITextarea, {
            props: {
                modelValue: '',
                name: 'input',
                autofocus: true
            },
            attachTo: elem
        });

        expect(wrapper.get('textarea').element).toBe(document.activeElement);
    });

    it('should not show the clear icon if no-clear is provided', () => {
        const wrapper = mount(UITextarea, {
            props: {
                name: 'input',
                modelValue: 'Hello World',
                noClear: true
            }
        });

        expect(wrapper.find('.clear-icon').exists()).toBe(false);
    });

    it('should not show the clear icon if there is no value', () => {
        const wrapper = mount(UITextarea, {
            props: {
                name: 'input',
                modelValue: ''
            }
        });

        expect(wrapper.find('.clear-icon').exists()).toBe(false);
    });

    it('should not show the clear icon if it is disabled', () => {
        const wrapper = mount(UITextarea, {
            props: {
                name: 'input',
                modelValue: 'Hello World'
            },
            attrs: {
                disabled: true
            }
        });

        expect(wrapper.find('.clear-icon').exists()).toBe(false);
    });

    it('should clear the value when the clear icon is clicked', async () => {
        const wrapper = mount(UITextarea, {
            props: {
                name: 'input',
                modelValue: 'Hello World',
                clearable: true
            }
        });

        expect(wrapper.get('textarea').element.value).toBe('Hello World');
        await wrapper.get('.clear-icon').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        expect(wrapper.emitted('update:modelValue')![0]).toStrictEqual(['']);
    });

    it('should display the character count given the prop', async () => {
        const value = 'Hello World';
        const wrapper = mount(UITextarea, {
            props: {
                name: 'input',
                modelValue: value
            }
        });

        expect(wrapper.text()).not.toContain(value.length);
        await wrapper.setProps({ counter: true });
        expect(wrapper.text()).toContain(value.length);

        await wrapper.get('textarea').setValue(value + ' + 1');
        await wrapper.trigger('input');
        expect(wrapper.text()).toContain((value + ' + 1').length);
    });
});
