import { mount } from '@vue/test-utils';
import UIPagination from './UIPagination.vue';
import { ref } from 'vue';

const commonProps = {
    modelValue: 5,
    length: 10,
    visibleCount: 3
} as const;

describe('UIPagination', () => {
    it('should render correctly', () => {
        const wrapper = mount(UIPagination, {
            props: commonProps
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should display the correct number of buttons', async () => {
        const wrapper = mount(UIPagination, {
            props: commonProps
        });

        expect(wrapper.findAll('button')).toHaveLength(
            // previous and next buttons
            2
            // the buttons
            + commonProps.visibleCount
            // the wrapping end buttons
            + 2
        );

        await wrapper.setProps({ visibleCount: 5 });
        expect(wrapper.findAll('button')).toHaveLength(
            // previous and next buttons
            2
            // the buttons
            + 5
            // the wrapping end buttons
            + 2
        );
    });

    it('should navigate to the previous page on previous button', async () => {
        const wrapper = mount(UIPagination, {
            props: commonProps
        });

        const previousPageBtn = wrapper.find('#previous-page-button');
        await previousPageBtn.trigger('click');

        expect(wrapper.lastEventValue()).toStrictEqual([4]);
        await previousPageBtn.trigger('click');
        await previousPageBtn.trigger('click');
        await previousPageBtn.trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([1]);

        await previousPageBtn.trigger('click');
        // it is now disabled so:
        expect(wrapper.lastEventValue()).toStrictEqual([1]);
        expect(wrapper.emitted('update:modelValue')).toHaveLength(4);
    });

    it('should navigate to the next page on next button', async () => {
        const wrapper = mount(UIPagination, {
            props: commonProps
        });

        const nextPageBtn = wrapper.find('#next-page-button');
        await nextPageBtn.trigger('click');

        expect(wrapper.lastEventValue()).toStrictEqual([6]);
        await nextPageBtn.trigger('click');
        await nextPageBtn.trigger('click');
        await nextPageBtn.trigger('click');
        await nextPageBtn.trigger('click');
        expect(wrapper.lastEventValue()).toStrictEqual([10]);

        await nextPageBtn.trigger('click');
        // it is now disabled so:
        expect(wrapper.lastEventValue()).toStrictEqual([10]);
        expect(wrapper.emitted('update:modelValue')).toHaveLength(5);
    });

    it('should handle model-binding correctly', async () => {
        const wrapper = mount({
            components: { UIPagination },
            template: '<UIPagination v-model="value" length="10" visible-count="3" />' +
                '<div id="decrement" @click="value--" />',
            setup: () => {
                return {
                    value: ref(5)
                };
            }
        });

        expect(wrapper.find('#page-5-button').attributes()['title']).toBe('Current Page, Page 5');
        await wrapper.find('#next-page-button').trigger('click');
        expect(wrapper.find('#page-5-button').attributes()['title']).toBe('Go to page 5');
        expect(wrapper.find('#page-6-button').attributes()['title']).toBe('Current Page, Page 6');
        await wrapper.find('#decrement').trigger('click');
        expect(wrapper.find('#page-5-button').attributes()['title']).toBe('Current Page, Page 5');
        expect(wrapper.find('#page-6-button').attributes()['title']).toBe('Go to page 6');
    });

    it('should disable buttons if prop given', () => {
        const wrapper = mount(UIPagination, {
            props: { ...commonProps, disabled: true }
        });

        expect(wrapper.findAll('button[disabled]')).toHaveLength(
            // previous and next buttons
            2
            // the buttons
            + commonProps.visibleCount
            // the wrapping end buttons
            + 2
        );
    });
});
