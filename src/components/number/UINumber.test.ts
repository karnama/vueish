import { mount } from '@vue/test-utils';
//@ts-ignore - TODO: Investigate "module not found error"
import UIText from './UINumber.vue';

describe('UIText', () => {
    it('should handle model-binding correctly', async() => {
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

    it('should be enabled by default', async() => {
        const wrapper = mount(UIText, {
            props: {
                modelValue: '',
                name: 'text'
            }
        });

        expect(wrapper.get('input').attributes().disabled).toBeUndefined();
    });

    it('should be disabled when the prop is provided so', async() => {
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

        expect(input.attributes().id).toStrictEqual(name);
        expect(input.attributes().name).toStrictEqual(name);
        expect(label.attributes().for).toStrictEqual(name);
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

        expect(wrapper.get('label').text()).toStrictEqual(label);
    });

    it('should correctly display the label when passed as a slot', () => {
        const label = 'text';

        const wrapper = mount(UIText, {
            props: {
                modelValue: '',
                name: 'text'
            },
            slots: {
                default: label
            }
        });

        expect(wrapper.get('label').text()).toStrictEqual(label);
    });

    it('should autofocus on the input when the prop is provided', async() => {
        const elem = document.createElement('div');

        if (document.body) {
            document.body.appendChild(elem);
        }

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

    it('should clear the value when the clear icon is clicked', async() => {
        const modelValue = 'Hello World';

        const wrapper = mount(UIText, {
            props: {
                name: 'text',
                modelValue
            }
        });

        const input = wrapper.get('input').element;

        expect(input.value).toStrictEqual(modelValue);
        await wrapper.get('.clear-icon').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual(['']);
    });
});
