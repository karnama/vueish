import { mount } from '@vue/test-utils';
import { UIButton } from '../../src/components/index';

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

    it('can be display the given text', () => {
        let msg = 'Click Me';

        const wrapper = mount(UIButton, {
            slots: {
                default: msg
            }
        });

        expect(wrapper.text()).toBe(msg);
    });
});
