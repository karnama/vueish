import { mount } from '@vue/test-utils';
import type { DOMWrapper } from '@vue/test-utils';
import UIRadio from './UIRadio.vue';
import UIRadioGroup from './UIRadioGroup.vue';
import { disableConsoleWarn, enableConsoleWarn } from 'helpers/test';

const selectorMap = {
    radioGroup: {
        label: 'span.font-medium.text-color.flex.items-center'
    }
} as const;

describe('UIRadio', () => {
    it('should bind attributes to the input', () => {
        const foo = 'bar';

        const wrapper = mount(UIRadio, {
            props: {
                value: 1
            },
            attrs: {
                foo
            }
        });

        expect(wrapper.get('input').attributes().foo).toBe(foo);
    });

    it('should display the label when passed as a prop', () => {
        const label = 'text';

        const wrapper = mount(UIRadio, {
            props: {
                value: 1,
                label
            }
        });

        expect(wrapper.get('label').text()).toBe(label);
    });

    it('should display the label when passed as a slot', () => {
        const label = 'text';

        const wrapper = mount(UIRadio, {
            props: {
                value: 1
            },
            slots: {
                default: label
            }
        });

        expect(wrapper.get('label').text()).toBe(label);
    });
});

describe('UIRadioGroup', () => {
    it('should display correctly', () => {
        const wrapper = mount({
            template: `
                <UIRadioGroup label="my-label" name="name">
                <UIRadio value="foo"/>
                <UIRadio value="bar"/>
                </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should display the label when passed as a prop', () => {
        const label = 'text';

        const wrapper = mount({
            template: `
                <UIRadioGroup label="${label}" name="name">
                  <UIRadio value="foo" />
                  <UIRadio value="bar" />
                </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        });

        expect(wrapper.get(selectorMap.radioGroup.label).text()).toBe(label);
    });

    it('should display the label when passed as a slot', () => {
        const label = 'text';

        const wrapper = mount({
            template: `
                <UIRadioGroup name="name">
                <template #label>${label}</template>
                <UIRadio value="foo"/>
                <UIRadio value="bar"/>
                </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        });

        expect(wrapper.get(selectorMap.radioGroup.label).text()).toBe(label);
    });

    it('should bind the correct classes when in default orientation', () => {
        const wrapper = mount({
            template: `
                <UIRadioGroup name="name">
                <UIRadio value="foo"/>
                <UIRadio value="bar"/>
                </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        });

        expect(wrapper.get('.ui-radio-group .slot').classes()).toContain('flex-col');
    });

    it('should bind the correct classes when set to horizontal', () => {
        const wrapper = mount({
            template: `
                <UIRadioGroup horizontal name="name">
                <UIRadio value="foo"/>
                <UIRadio value="bar"/>
                </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        });


        expect(wrapper.get('.ui-radio-group .slot').classes()).not.toContain('flex-col');
    });

    it('should bind the name value to the radio inputs', () => {
        const wrapper = mount({
            template: `
                <UIRadioGroup name="input">
                <UIRadio value="foo"/>
                <UIRadio value="bar"/>
                </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        });

        const inputs = wrapper.findAll('input[type="radio"]');
        inputs.forEach(input => expect(input.attributes().name).toBe('input'));
    });

    it('should bind the disabled value to the radio inputs', async () => {
        const wrapper = mount({
            template: `
                <UIRadioGroup name="name">
                <UIRadio value="foo"/>
                <UIRadio value="bar"/>
                </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        });

        const inputs = wrapper.findAll('input[type="radio"]');

        inputs.forEach(input => expect(input.attributes().disabled).toBeUndefined());
        await wrapper.setProps({ disabled: true });
        inputs.forEach(input => expect(input.attributes().disabled).toBeDefined());
    });

    it('should bind the required value to the radio inputs', async () => {
        const wrapper = mount({
            template: `
                <UIRadioGroup name="name">
                <UIRadio value="foo"/>
                <UIRadio value="bar"/>
                </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        });

        const inputs = wrapper.findAll('input[type="radio"]');

        expect(inputs[0].attributes().required).toBeUndefined();
        await wrapper.setProps({ required: true });
        expect(inputs[0].attributes().required).toBeDefined();
    });

    it('should bind the modelValue to the radio inputs', async () => {
        const wrapper = mount({
            template: `
                    <UIRadioGroup>
                    <UIRadio value="foo"/>
                    <UIRadio value="bar"/>
                    </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        },
        {
            props: {
                name: 'name',
                modelValue: 'foo'
            }
        });

        const inputs: DOMWrapper<HTMLInputElement>[] = wrapper.findAll('input[type="radio"]');

        expect(inputs[0].element.checked).toBe(true);
        expect(inputs[1].element.checked).toBe(false);
        await wrapper.setProps({ modelValue: 'bar' });
        expect(inputs[0].element.checked).toBe(false);
        expect(inputs[1].element.checked).toBe(true);
    });

    it('should update the modelValue when a child is clicked', async () => {
        const wrapper = mount({
            template: `
                    <UIRadioGroup>
                    <UIRadio value="foo"/>
                    <UIRadio value="bar"/>
                    </UIRadioGroup>`,
            components: { UIRadioGroup, UIRadio }
        },
        {
            props: {
                name: 'name',
                modelValue: 'foo'
            }
        });

        const radioGroup = wrapper.findComponent(UIRadioGroup);
        const input = wrapper.find('input[type="radio"]');

        await input.trigger('click');
        expect(radioGroup.emitted('update:modelValue')).toBeDefined();
        expect(radioGroup.emitted('update:modelValue')![0]).toStrictEqual(['foo']);
    });

    it('should throw an error if there are missing UIRadio components', () => {
        disableConsoleWarn();
        expect(() => mount(UIRadioGroup))
            .toThrow(new RangeError('UIRadioGroup requires at least 2 UIRadio components in the default slot.'));

        enableConsoleWarn();
    });
});
