import { mount } from '@vue/test-utils';
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

    it('should be enabled by default', () => {
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

    it('should bind the name prop to the element', () => {
        const name = 'input';

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
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
        const label = 'input';

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                label
            }
        });

        expect(wrapper.get('label').text()).toBe(label);
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

        expect(wrapper.get('.prefix').text()).toBe(prefix);
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

        expect(wrapper.get('.prefix').text()).toBe(prefix);
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

        expect(wrapper.get('.suffix').text()).toBe(suffix);
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

        expect(wrapper.get('.suffix').text()).toBe(suffix);
    });

    it('should autofocus on the input when the prop is provided', () => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);

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

    it('should bind the min prop to the element', () => {
        const min = 10;

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                min
            }
        });

        const minAttr = Number(wrapper.get('input').attributes().min);

        expect(minAttr).toBe(min);
    });

    it('should bind the max prop to the element', () => {
        const max = 10;

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                max
            }
        });

        const maxAttr = Number(wrapper.get('input').attributes().max);

        expect(maxAttr).toBe(max);
    });

    it('should bind the step prop to the element', () => {
        const step = 10;

        const wrapper = mount(UINumber, {
            props: {
                modelValue: 0,
                name: 'input',
                step
            }
        });

        const stepAttr = Number(wrapper.get('input').attributes().step);

        expect(stepAttr).toBe(step);
    });
});
