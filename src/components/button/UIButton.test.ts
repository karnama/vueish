import { mount } from '@vue/test-utils';
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

        //TODO-KD: Need to add an assertion to check for the click event.
        expect(wrapper.get('button').attributes().disabled).toBeUndefined();
        await wrapper.setProps({ disabled: true });
        expect(wrapper.get('button').attributes().disabled).toBe('');
    });

    it('can display the label via the slot', () => {
        let msg = 'Click Me';

        const wrapper = mount(UIButton, {
            slots: {
                default: msg
            }
        });

        expect(wrapper.text()).toBe(msg);
    });

    it('can display the label via the prop', () => {
        let msg = 'Click Me';

        const wrapper = mount(UIButton, {
            props: {
                label: msg
            }
        });

        expect(wrapper.text()).toBe(msg);
    });
});
