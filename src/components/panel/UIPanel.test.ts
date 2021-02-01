import { mount } from '@vue/test-utils';
import UIPanel from './UIPanel.vue';

describe('UIPanel', () => {
    it('should render', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            shallow: true
        });

        expect(wrapper).toBeDefined();
        expect(wrapper.exists()).toBe(true);
    });

    it('should display the actions slot when action content when given', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            slots: {
                actions: 'action content'
            }
        });

        expect(wrapper.html()).toContain('action content');
    });

    it('should display the header slot content', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            shallow: true
        });
        // wrapper.see(options.slots.header);
    });

    it('should display the footer slot content', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            shallow: true
        });
        // wrapper.see(options.slots.footer);
    });

    it('should display the default slot content', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            shallow: true
        });
        // wrapper.see(options.slots.default);
    });

    it.skip('can be closed/opened by a prop', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            shallow: true
        });
    });

    it('can be collapsed by clicking the header', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            shallow: true
        });
    });

    it('collapsible behavior can be disabled', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            shallow: true
        });

    });
});
