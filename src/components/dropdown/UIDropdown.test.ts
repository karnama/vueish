import { DOMWrapper, mount } from '@vue/test-utils';
import UIDropdown from './UIDropdown.vue';
import { h, nextTick } from 'vue';

describe('UIDropdown', () => {
    it('should correctly display', async () => {
        const wrapper = mount(UIDropdown, {
            slots: {
                default: h('div', { id: 'content' }),
                trigger: h('div', { id: 'trigger' })
            }
        });

        // @ts-expect-error - ts reckons this has the type never
        wrapper.vm.toggle();
        await nextTick();
        expect(document.body.lastElementChild).toMatchSnapshot();
        wrapper.unmount();
    });

    it('should display the given content when open', async () => {
        const wrapper = mount(UIDropdown, {
            slots: {
                default: h('div', { id: 'content' }),
                trigger: h('div', { id: 'trigger' })
            }
        });

        const documentWrapper = new DOMWrapper(document.body);

        expect(documentWrapper.find('#content').exists()).toBe(false);
        // @ts-expect-error - ts reckons this has the type never
        wrapper.vm.toggle();
        await nextTick();
        expect(documentWrapper.find('#content').exists()).toBe(true);
    });

    it('should emit the open and close event at appropriate times', () => {
        const wrapper = mount(UIDropdown, {
            slots: {
                default: h('div', { id: 'content' }),
                trigger: h('div', { id: 'trigger' })
            }
        });

        expect(wrapper.emitted()).not.toHaveProperty('open');
        expect(wrapper.emitted()).not.toHaveProperty('close');

        // @ts-expect-error - ts reckons this has the type never
        wrapper.vm.toggle();
        expect(wrapper.emitted('open')).toHaveLength(1);
        expect(wrapper.emitted()).not.toHaveProperty('close');

        // @ts-expect-error - ts reckons this has the type never
        wrapper.vm.toggle();
        expect(wrapper.emitted('close')).toHaveLength(1);
    });
});
