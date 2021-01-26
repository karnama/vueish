import { mount } from '@vue/test-utils';
import UIButton from '../button/UIButton.vue';

describe('UIButton', () => {
    it('can be enabled', () => {
        const wrapper = mount(UIButton, {
            props: {
                disabled: false
            }
        });

        expect(wrapper.get('button').attributes().disabled).toBeUndefined();
    });

    it('can be disabled', () => {
        const wrapper = mount(UIButton, {
            props: {
                disabled: true
            }
        });

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
