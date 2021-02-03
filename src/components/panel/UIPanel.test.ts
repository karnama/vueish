import { mount } from '@vue/test-utils';
import UIPanel from './UIPanel.vue';
import { nextTick } from 'vue';

describe('UIPanel', () => {
    it('should render', () => {
        const wrapper = mount(UIPanel, {
            props: {}
        });

        expect(wrapper).toBeDefined();
        expect(wrapper.exists()).toBe(true);
    });

    it('should display the actions slot when action content when given', async () => {
        const wrapper = mount(UIPanel, {
            props: {},
            slots: {
                actions: 'action content'
            }
        });
        await nextTick();

        expect(wrapper.html()).toContain('action content');
    });

    it('should display the header slot content when slot content given', async () => {
        const wrapper = mount(UIPanel, {
            props: {},
            slots: {
                header: 'header content'
            }
        });
        await nextTick();

        expect(wrapper.html()).toContain('header content');
    });

    it('should display the footer slot when footer content is given', async () => {
        const wrapper = mount(UIPanel, {
            props: {},
            slots: {
                footer: 'footer content'
            }
        });
        await nextTick();

        expect(wrapper.html()).toContain('footer content');
    });

    it('should display the default slot content', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            slots: {
                default: 'default content'
            }
        });

        expect(wrapper.html()).toContain('default content');
    });

    it('should close/open by a prop', async () => {
        const wrapper = mount(UIPanel, {
            slots: {
                default: '<div id="default"/>'
            }
        });

        expect(wrapper.find('#default').isVisible()).toBe(true);
        await wrapper.setProps({
            closed: true
        });
        expect(wrapper.find('#default').isVisible()).toBe(false);
    });

    it('should close and open by clicking on the header', async () => {
        const wrapper = mount(UIPanel, {
            slots: {
                header: '<div id="header" />',
                default: '<div id="default" />'
            }
        });
        await nextTick();

        expect(wrapper.find('#default').isVisible()).toBe(true);
        await wrapper.find('#header').trigger('click');
        expect(wrapper.find('#default').isVisible()).toBe(false);
        await wrapper.find('#header').trigger('click');
        expect(wrapper.find('#default').isVisible()).toBe(true);

    });

    it('should disable the collapsible behavior when prop given', async () => {
        const wrapper = mount(UIPanel, {
            slots: {
                header: '<div id="header" />',
                default: '<div id="default" />'
            },
            props: {
                noCollapse: true
            }
        });
        await nextTick();

        expect(wrapper.find('#default').isVisible()).toBe(true);
        await wrapper.find('#header').trigger('click');
        expect(wrapper.find('#default').isVisible()).toBe(true);

    });
});
