import { mount } from '@vue/test-utils';
import UIBadge from '@components/badge/UIBadge.vue';

describe('UIBadge', () => {
    it('should display the given prop content', () => {
        const wrapper = mount(UIBadge, {
            props: {
                content: 'my-content'
            }
        });

        expect(wrapper.text()).toBe('my-content');
    });

    it('should display the given named slot', () => {
        const wrapper = mount(UIBadge, {
            slots: {
                content: 'my-content'
            }
        });

        expect(wrapper.text()).toBe('my-content');
    });
});
