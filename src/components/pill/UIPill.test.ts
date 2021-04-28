import { mount } from '@vue/test-utils';
import UIPill from './UIPill.vue';

describe('UIPill', () => {
    it('should display correctly', () => {
        const wrapper = mount(UIPill, {
            slots: {
                default: 'my-string'
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });
    it('should display the given label prop', () => {
        const wrapper = mount(UIPill, {
            props: {
                label: 'my-string'
            }
        });

        expect(wrapper.text()).toBe('my-string');
    });

    it('should display the default slot', () => {
        const wrapper = mount(UIPill, {
            slots: {
                default: 'my-string'
            }
        });

        expect(wrapper.text()).toBe('my-string');
    });
});
