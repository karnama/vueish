import { mount } from '@vue/test-utils';
import UIText from './UIText.vue';

describe('UIText', () => {
    it('should handle model-binding correctly', async () => {
        const wrapper = mount({
            template: '<div><UIText v-model="input" name="text"/></div>',
            components: { UIText },
            props: {},
            data() {
                return { input: '' };
            }
        });

        await wrapper.find('input').setValue('Hello World');

        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual(['Hello World']);
    });

    it('should be enabled by default', () => {
        const wrapper = mount(UIText, {
            props: {
                modelValue: '',
                name: 'text'
            }
        });

        expect(wrapper.get('input').attributes().disabled).toBeUndefined();
    });

    it('should be disabled when the prop is provided so', async () => {
        const wrapper = mount(UIText, {
            props: {
                modelValue: '',
                name: 'text',
                disabled: false
            }
        });

        const input = wrapper.get('input');

        expect(input.attributes().disabled).toBeUndefined();
        await wrapper.setProps({ disabled: true });
        expect(input.attributes().disabled).not.toBeUndefined();
    });

    it('should correctly assign the name prop', () => {
        const name = 'text';

        const wrapper = mount(UIText, {
            props: {
                modelValue: '',
                name
            }
        });

        const input = wrapper.get('input');
        const label = wrapper.get('label');

        expect(input.attributes().id).toBe(name);
        expect(input.attributes().name).toBe(name);
        expect(label.attributes().for).toBe(name);
    });

    it('should correctly display the label when passed as a prop', () => {
        const label = 'text';

        const wrapper = mount(UIText, {
            props: {
                modelValue: '',
                name: 'text',
                label
            }
        });

        expect(wrapper.get('label').text()).toBe(label);
    });

    it('should autofocus on the input when the prop is provided', () => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);

        const wrapper = mount(UIText, {
            props: {
                modelValue: '',
                name: 'text',
                autofocus: true
            },
            attachTo: elem
        });

        expect(wrapper.get('input').element).toBe(document.activeElement);
    });

    it('should clear the value when the clear icon is clicked', async () => {
        const modelValue = 'Hello World';

        const wrapper = mount(UIText, {
            props: {
                name: 'text',
                modelValue
            }
        });

        const input = wrapper.get('input').element;

        expect(input.value).toBe(modelValue);
        await wrapper.get('.clear-icon').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual(['']);
    });
});
