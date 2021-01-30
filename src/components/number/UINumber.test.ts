import { mount } from '@vue/test-utils';
//@ts-ignore - TODO: Investigate "module not found error"
import UINumber from './UINumber.vue';

describe('UINumber', () => {
    it('should handle model-binding correctly', async() => {
        const wrapper = mount({
            template: '<div><UINumber v-model="input" name="input"/></div>',
            components: { UINumber },
            props: {},
            data() {
                return { input: 0 };
            }
        });

        await wrapper.find('input').setValue(1234);

        expect(wrapper.emitted()).toHaveProperty('update:modelValue');
        expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual([1234]);
    });

    it('should be enabled by default', async() => {
        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input'
            }
        });

        expect(wrapper.get('input').attributes().disabled).toBeUndefined();
    });

    it('should be disabled when the prop is provided so', async() => {
        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                disabled: false
            }
        });

        const input = wrapper.get('input');

        expect(input.attributes().disabled).toBeUndefined();
        await wrapper.setProps({ disabled: true });
        expect(input.attributes().disabled).not.toBeUndefined();
    });

    it('should correctly assign the name prop', () => {
        const name = 'input';

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
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
        const label = 'input';

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                label
            }
        });

        expect(wrapper.get('label').text()).toStrictEqual(label);
    });

    it('should correctly display the prefix when passed as a slot', () => {
        const prefix = 'prefix';

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input'
            },
            slots: {
                prefix
            }
        });

        expect(wrapper.get('.prefix').text()).toStrictEqual(prefix);
    });

    it('should correctly display the prefix when passed as a prop', () => {
        const prefix = 'prefix';

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                prefix
            }
        });

        expect(wrapper.get('.prefix').text()).toStrictEqual(prefix);
    });

    it('should correctly display the suffix when passed as a slot', () => {
        const suffix = 'suffix';

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input'
            },
            slots: {
                suffix
            }
        });

        expect(wrapper.get('.suffix').text()).toStrictEqual(suffix);
    });

    it('should correctly display the suffix when passed as a prop', () => {
        const suffix = 'suffix';

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                suffix
            }
        });

        expect(wrapper.get('.suffix').text()).toStrictEqual(suffix);
    });

    it('should autofocus on the input when the prop is provided', async() => {
        const elem = document.createElement('div');

        if (document.body) {
            document.body.appendChild(elem);
        }

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                autofocus: true
            },
            attachTo: elem
        });

        expect(wrapper.get('input').element).toBe(document.activeElement);
    });
});
