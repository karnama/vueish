import { mount } from '@vue/test-utils';
import UIAvatar from '@components/avatar/UIAvatar.vue';

describe('UIAvatar', () => {
    it('should correctly display', () => {
        const wrapper = mount(UIAvatar);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should display the given default content if no src given', () => {
        const wrapper = mount(UIAvatar, {
            slots: {
                default: 'my-slot'
            }
        });

        expect(wrapper.text()).toBe('my-slot');
    });

    it('should display alt\'s first letter if given and source cannot load and slot not given', () => {
        const wrapper = mount(UIAvatar, {
            props: {
                alt: 'my alt text'
            }
        });

        expect(wrapper.text()).toBe('M');
    });

    it('should fall back to displaying the person icon', () => {
        const wrapper = mount(UIAvatar);

        expect(wrapper.get('svg').isVisible()).toBe(true);
    });

    it('should apply to correct rounded styles', async () => {
        const wrapper = mount(UIAvatar);

        expect(wrapper.html()).toContain('rounded-full');
        expect(wrapper.html()).not.toContain('rounded ');
        await wrapper.setProps({ squared: true });
        expect(wrapper.html()).not.toContain('rounded-full');
        expect(wrapper.html()).toContain('rounded');
    });

    it('should react to changes of the src prop', async () => {
        const wrapper = mount(UIAvatar);

        expect(wrapper.find('img').isVisible()).toBe(false);
        await wrapper.setProps({
            src: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
        });
        expect(wrapper.find('img').isVisible()).toBe(true);
    });
});
