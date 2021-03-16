import { disableConsoleWarn, enableConsoleWarn } from '@helpers/test';
import { mount } from '@vue/test-utils';
import UITab from '@components/tabs/UITab.vue';
import UITabs from '@components/tabs/UITabs.vue';
import { defineComponent } from 'vue';

describe('UITab', () => {
    it('should throw an error if no title is given', () => {
        disableConsoleWarn();
        let failingFunc = () => mount(UITab);
        expect(failingFunc).toThrow(new Error('The title prop or slot is required when using UITab.'));

        failingFunc = () => mount(UITab, {
            props: {
                title: 'title'
            }
        });
        expect(failingFunc).not.toThrow(new Error('The title prop or slot is required when using UITab.'));

        failingFunc = () => mount(UITab, {
            slots: {
                title: 'title'
            }
        });
        expect(failingFunc).not.toThrow(new Error('The title prop or slot is required when using UITab.'));

        enableConsoleWarn();
    });
});

describe('UITabs', () => {
    it('should throw an error if less then 2 child given in the default slot', () => {
        disableConsoleWarn();

        const failingFunc = () => mount({
            template: '<UITabs><UITab><template #title>title</template></UITab></UITabs>',
            components: { UITabs, UITab }
        });

        expect(failingFunc).toThrow(new Error('UITabs expect at least 2 UITabs in the default slot.'));
        enableConsoleWarn();
    });

    it('should throw an error if no title have been given to any of the UITabs', () => {
        disableConsoleWarn();

        const failingFunc = () => mount({
            template: '<UITabs><UITab title="title"></UITab><UITab /></UITabs>',
            components: { UITabs, UITab }
        });

        expect(failingFunc).toThrow(new Error('UITabs expect at least 2 UITabs in the default slot.'));

        enableConsoleWarn();
    });

    it('should display the titles from the slotted content', () => {
        const wrapper = mount({
            template: '<UITabs><UITab title="tab1" /><UITab title="tab2" /></UITabs>',
            components: { UITabs, UITab }
        });

        expect(wrapper.html()).toContain('tab1');
        expect(wrapper.html()).toContain('tab2');
    });

    it('should switch tabs when clicking on the title', async () => {
        const wrapper = mount({
            template: '<UITabs>' +
                        '<UITab title="tab1">tab-1-content</UITab><UITab title="tab2">tab-2-content</UITab>' +
                      '</UITabs>',
            components: { UITabs, UITab }
        });

        expect(wrapper.html()).toContain('tab-1-content');
        expect(wrapper.html()).not.toContain('tab-2-content');

        await wrapper.find('div.cursor-pointer:not(.active-tab)').trigger('click');

        expect(wrapper.html()).toContain('tab-2-content');
        expect(wrapper.html()).not.toContain('tab-1-content');
    });

    it('should accept both text and components in the UITab\'s default slot', async () => {
        const Foo = defineComponent({ name: 'Foo', template: 'foo-content' });

        const wrapper = mount({
            template: '<UITabs>' +
                '<UITab title="tab1">tab-1-content</UITab><UITab title="tab2"><Foo /></UITab>' +
                '</UITabs>',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            components: { UITabs, UITab, Foo }
        });

        expect(wrapper.html()).toContain('tab-1-content');
        expect(wrapper.html()).not.toContain('foo-content');

        await wrapper.find('div.cursor-pointer:not(.active-tab)').trigger('click');

        expect(wrapper.html()).not.toContain('tab-1-content');
        expect(wrapper.html()).toContain('foo-content');
    });
});
