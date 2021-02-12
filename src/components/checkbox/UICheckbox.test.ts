import UICheckbox from './UICheckbox.vue';
import { mount } from '@vue/test-utils';

describe('UICheckbox', () => {
    it('should render', () => {
        const wrapper = mount(UICheckbox, {
            props: {
                name: 'inputName'
            }
        });

        expect(wrapper).toBeDefined();
        expect(wrapper.exists()).toBe(true);
    });

    it('should toggle array value when v-model is array', async () => {
        const wrapper = mount(UICheckbox, {
            props: {
                modelValue: [],
                value: 'value',
                name: 'inputName'
            }
        });

        await wrapper.find('#inputName').trigger('click');

        expect(wrapper.emitted()['update:modelValue'][0]).toHaveLength(1);
        // @ts-expect-error
        expect(wrapper.emitted()['update:modelValue'][0][0]).toStrictEqual(['value']);
    });

    it('should throw error on invalid prop logic', () => {
        const consoleErrorMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const failingFunc = jest.fn(() => mount(UICheckbox, {
            props: {
                modelValue: [],
                name: 'inputName'
            }
        }));

        expect(failingFunc).toThrow(new Error('\'value\' is required if the v-model  value is an array.'));
        consoleErrorMock.mockRestore();
    });

    it('should update when clicked on', async () => {
        const wrapper = mount(UICheckbox, {
            props: {
                modelValue: false,
                name: 'inputName'
            }
        });

        await wrapper.find('#inputName').trigger('click');
        expect(wrapper.find('input').element.checked).toBe(true);
        await wrapper.find('#inputName').trigger('click');
        expect(wrapper.find('input').element.checked).toBe(false);
    });

    it('should display the label when given as prop', () => {
        const wrapper = mount(UICheckbox, {
            props: {
                name: 'inputName',
                label: 'labelValue'
            }
        });

        expect(wrapper.html()).toContain('labelValue');
    });

    it('should display the label when given in default slot', () => {
        const wrapper = mount(UICheckbox, {
            props: {
                name: 'inputName'
            },
            slots: {
                default: 'labelValue'
            }
        });

        expect(wrapper.html()).toContain('labelValue');
    });
});
