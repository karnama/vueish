import { mount } from '@vue/test-utils';
import UIApp from './UIApp.vue';

describe('UIApp', () => {
    it('should render the child components', () => {
        const wrapper = mount(UIApp, {
            slots: {
                default: 'content'
            }
        });

        expect(wrapper.html()).toContain('content');
    });
});
