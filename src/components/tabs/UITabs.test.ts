import { mount } from '@vue/test-utils';
import UITab from './UITab.vue';
import UITabs from './UITabs.vue';
import { defineComponent, nextTick, ref } from 'vue';

describe('UITab', () => {
    it('should throw an error if no title is given', () => {
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
        const Foo = defineComponent({ name: 'FooBar', template: 'foo-content' });

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
        console.log(wrapper.html());
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
