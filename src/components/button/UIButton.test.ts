import { mount } from '@vue/test-utils';
//@ts-ignore - TODO: Investigate "module not found error"
import UIButton from '../button/UIButton.vue';

describe('UIButton', () => {
    it('is enabled by default', () => {
        const wrapper = mount(UIButton);

        expect(wrapper.get('button').attributes().disabled).toBeUndefined();
    });

    it('can be disabled', async() => {
        const wrapper = mount(UIButton, {
            props: {
                disabled: false
            }
        });

        const button = wrapper.get('button');

        expect(button.attributes().disabled).toBeUndefined();
        await wrapper.setProps({ disabled: true });
        expect(button.attributes().disabled).not.toBeUndefined();
    });

    it('should not be triggering the click event on disabled', async () => {
        const mockFn = jest.fn();

        const wrapper = mount(UIButton, {
            props: {
                disabled: true
            },
            attrs: {
                'onClick': mockFn
            }
        });

        const button = wrapper.get('button');
        await button.trigger('click');
        expect(mockFn).not.toHaveBeenCalled();

    });

    it('should display the label via the slot when provided', () => {
        let msg = 'Click Me';

        const wrapper = mount(UIButton, {
            slots: {
                default: msg
            }
        });

        expect(wrapper.text()).toBe(msg);
    });

    it('should display the label via the prop when provided', () => {
        let msg = 'Click Me';

        const wrapper = mount(UIButton, {
            props: {
                label: msg
            }
        });

        expect(wrapper.text()).toBe(msg);
    });
});
