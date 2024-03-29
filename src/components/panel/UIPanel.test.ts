import { mount } from '@vue/test-utils';
import UIPanel from './UIPanel.vue';

describe('UIPanel', () => {
    it('should render correctly', () => {
        const wrapper = mount(UIPanel, {
            slots: {
                default: 'default slot text',
                header: 'header text'
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should display the actions slot when action content when given', () => {
        const wrapper = mount(UIPanel, {
            slots: {
                actions: 'action content'
            }
        });

        expect(wrapper.html()).toContain('action content');
    });

    it('should display the header slot content when slot content given', () => {
        const wrapper = mount(UIPanel, {
            props: {},
            slots: {
                header: 'header content'
            }
        });

        expect(wrapper.html()).toContain('header content');
    });

    it('should display the header when given as prop', () => {
        const wrapper = mount(UIPanel, {
            props: {
                header: 'header content'
            }
        });

        expect(wrapper.html()).toContain('header content');
    });

    it('should display the footer slot when footer content is given', () => {
        const wrapper = mount(UIPanel, {
            slots: {
                footer: 'footer content'
            }
        });

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
        expect(wrapper.find('#default').exists()).toBe(false);
    });

    it('should close and open by clicking on the header', async () => {
        const wrapper = mount(UIPanel, {
            slots: {
                header: '<div id="header" />',
                default: '<div id="default" />'
            }
        });

        expect(wrapper.find('#default').isVisible()).toBe(true);
        await wrapper.find('#header').trigger('click');
        expect(wrapper.find('#default').exists()).toBe(false);
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

        expect(wrapper.find('#default').isVisible()).toBe(true);
        await wrapper.find('#header').trigger('click');
        expect(wrapper.find('#default').isVisible()).toBe(true);

    });
});
