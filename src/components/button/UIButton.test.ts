import { mount } from '@vue/test-utils';
import UIButton from './UIButton.vue';

describe('UIButton', () => {
    it('should be enabled by default', () => {
        const wrapper = mount(UIButton);

        expect(wrapper.get('button').attributes().disabled).toBeUndefined();
    });

    it('should be disabled when the prop is provided', async () => {
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

    it('should not trigger the click event when disabled', async () => {
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
        const msg = 'Click Me';

        const wrapper = mount(UIButton, {
            slots: {
                default: msg
            }
        });

        expect(wrapper.text()).toBe(msg);
    });

    it('should display the label via the prop when provided', () => {
        const msg = 'Click Me';

        const wrapper = mount(UIButton, {
            props: {
                label: msg
            }
        });

        expect(wrapper.text()).toBe(msg);
    });

    it('should set the pointer events none on loading', () => {
        const wrapper = mount(UIButton, {
            props: {
                label: 'hi',
                loading: true
            }
        });

        expect(wrapper.attributes('class')).toContain('pointer-events-none');
    });

    // todo uncomment when https://github.com/vuejs/vue-test-utils-next/pull/454 is merged
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should not show the button default slot when loading', () => {
        const wrapper = mount(UIButton, {
            props: {
                label: 'hi',
                loading: true
            }
        });

        expect(wrapper.get('.label').isVisible()).toContain(false);
        expect(wrapper.get('.loader').isVisible()).toContain(true);
    });

    it('should display the given loading slot', () => {
        const wrapper = mount(UIButton, {
            props: {
                label: 'hi',
                loading: true
            },
            slots: {
                loader: 'loading...'
            }
        });

        expect(wrapper.html()).toContain('loading..');
    });
});
