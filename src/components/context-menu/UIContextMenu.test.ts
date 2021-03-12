import { mount } from '@vue/test-utils';
import UIContextMenu from '@components/context-menu/UIContextMenu.vue';
import { h, nextTick } from 'vue';

describe('UIContextMenu', () => {
    it('should display the given content when open', async () => {
        const wrapper = mount(UIContextMenu, {
            slots: {
                default: h('div', { id: 'default-content' }),
                menu: h('div', { id: 'content' })
            }
        });

        expect(wrapper.find('#default-content').exists()).toBe(true);
        expect(wrapper.find('#content').exists()).toBe(false);
        // @ts-expect-error
        wrapper.vm.toggle();
        await nextTick();
        expect(wrapper.find('#content').exists()).toBe(true);
        expect(wrapper.find('#default-content').exists()).toBe(true);
    });
});
