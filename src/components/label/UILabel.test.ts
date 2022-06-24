import { mount } from '@vue/test-utils';
import UILabel from './UILabel.vue';

describe('UILabel', () => {
    it('should display correctly', () => {
        const wrapper = mount(UILabel, {
            slots: {
                default: 'my-string'
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });
    it('should display the given label prop', () => {
        const wrapper = mount(UILabel, {
            props: {
                label: 'my-string'
            }
        });

        expect(wrapper.text()).toBe('my-string');
    });

    it('should display the default slot', () => {
        const wrapper = mount(UILabel, {
            slots: {
                default: 'my-string'
            }
        });

        expect(wrapper.text()).toBe('my-string');
    });
});
