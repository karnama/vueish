import { mount } from '@vue/test-utils';
import UITab from './UITab.vue';
import UITabs from './UITabs.vue';
import { defineComponent, nextTick, ref } from 'vue';
import { disableConsoleWarn, enableConsoleWarn } from 'helpers/test';

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
        const failingFunc = () => mount({
            template: '<UITabs><UITab><template #title>title</template></UITab></UITabs>',
            components: { UITabs, UITab }
        });

        expect(failingFunc).toThrow(new Error('UITabs expect at least 2 UITabs in the default slot.'));
    });

    it('should throw an error if no title have been given to any of the UITabs', () => {
        const failingFunc = () => mount({
            template: '<UITabs><UITab title="title" /><UITab /></UITabs>',
            components: { UITabs, UITab }
        });

        expect(failingFunc).toThrow(new Error('UITab expect to have the title prop or title slot set.'));
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
                        '<UITab title="tab1"><p id="tab-1">tab-1-content</p></UITab>' +
                        '<UITab title="tab2"><p id="tab-2">tab-2-content</p></UITab>' +
                      '</UITabs>',
            components: { UITabs, UITab }
        });

        expect(wrapper.get('#tab-1').isVisible()).toBe(true);
        expect(wrapper.get('#tab-2').isVisible()).toBe(false);

        await wrapper.find('div.cursor-pointer:not(.active-tab)').trigger('click');

        expect(wrapper.get('#tab-1').isVisible()).toBe(false);
        expect(wrapper.get('#tab-2').isVisible()).toBe(true);
    });

    it('should accept both text and components in the UITab\'s default slot', async () => {
        // eslint-disable-next-line vue/one-component-per-file
        const Foo = defineComponent({ name: 'FooBar', template: '<p id="tab-2">foo-content</p>' });

        const wrapper = mount({
            template: '<UITabs>' +
                        '<UITab title="tab1"><p id="tab-1"></p>tab-1-content</UITab>' +
                        '<UITab title="tab2"><Foo /></UITab>' +
                      '</UITabs>',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            components: { UITabs, UITab, Foo }
        });

        expect(wrapper.get('#tab-1').isVisible()).toBe(true);
        expect(wrapper.findComponent(Foo).isVisible()).toBe(false);

        await wrapper.find('div.cursor-pointer:not(.active-tab)').trigger('click');

        expect(wrapper.get('#tab-1').isVisible()).toBe(false);
        expect(wrapper.get('#tab-2').isVisible()).toBe(true);
    });

    it('should keep the subcomponents alive', async () => {
        // eslint-disable-next-line vue/one-component-per-file
        const UISubComponent = defineComponent({
            name: 'UISubComponent',

            setup: () => {
                const number = ref(0);
                const increment = () => number.value++;

                return {
                    number,
                    increment
                };
            },

            template: 'my-number:{{ number }}'
        });

        const wrapper = mount({
            template: '<UITabs>' +
                '<UITab><template #title><p id="tab-1">title1</p></template></UITab>' +
                '<UITab><template #title><p id="tab-2">title2</p></template><UISubComponent ref="subComponent" />' +
                '</UITab></UITabs>',
            components: { UITabs, UITab, UISubComponent },
            setup: () => ({ subComponent: ref() })
        });

        await wrapper.find('#tab-2').trigger('click');
        expect(wrapper.html()).toContain('my-number:0');
        (wrapper.vm.$refs.subComponent as InstanceType<typeof UISubComponent>).increment();
        await nextTick();
        expect(wrapper.html()).toContain('my-number:1');
        await wrapper.find('#tab-1').trigger('click');
        await wrapper.find('#tab-2').trigger('click');
        expect(wrapper.html()).toContain('my-number:1');
    });

    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should have the tab open by default which is given as the initialTab', () => {
    //
    // });
    //
    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should have the tab open by ', () => {
    //
    // });
});
