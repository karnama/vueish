import { mount } from '@vue/test-utils';
import UIAvatarGroup from '@components/avatar/UIAvatarGroup.vue';
import type { Avatar } from 'types';
import UIAvatar from '@components/avatar/UIAvatar.vue';

const avatars: Avatar[] = [
    {},
    { alt: 'name' },
    { content: 'something' },
    { src: 'imgSource' },
    { squared: true }
];

describe('UIAvatarGroup', () => {
    it('should correctly display', () => {
        const wrapper = mount(UIAvatarGroup, {
            props: {
                avatars,
                max: avatars.length
            }
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should display the avatars given as prop', () => {
        const wrapper = mount(UIAvatarGroup, {
            props: {
                avatars,
                max: avatars.length
            }
        });

        expect(wrapper.findAll('.ui-avatar')).toHaveLength(avatars.length);
    });

    // currently not possible to test: https://github.com/vuejs/vue-test-utils-next/issues/482
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should display the avatars given in the default slot', () => {
        const wrapper = mount(UIAvatarGroup, {
            props: {
                max: avatars.length
            },
            slots: {
                default: [UIAvatar]
            }
        });

        expect(wrapper.findAll('.ui-avatar')).toHaveLength(avatars.length);
    });

    it('should apply classes to the avatars', () => {
        const wrapper = mount(UIAvatarGroup, {
            props: {
                avatars,
                max: avatars.length
            },
            attrs: {
                class: 'my-custom-class'
            }
        });

        const mountedAvatars = wrapper.findAll('.ui-avatar')
            .filter(avatar => avatar.html().includes('my-custom-class'));
        expect(mountedAvatars).toHaveLength(avatars.length);
    });

    it('should display max number of avatars as specified by the prop', async () => {
        const wrapper = mount(UIAvatarGroup, {
            props: {
                avatars
            }
        });

        expect(wrapper.findAll('.ui-avatar')).toHaveLength(4); // default 3 + 1
        await wrapper.setProps({ max: 1 });
        expect(wrapper.findAll('.ui-avatar')).toHaveLength(2);
        await wrapper.setProps({ max: avatars.length });
        expect(wrapper.findAll('.ui-avatar')).toHaveLength(avatars.length);
    });

    it('should set the rounded prop on the avatars', () => {
        const wrapper = mount(UIAvatarGroup, {
            props: {
                avatars,
                rounded: true
            }
        });

        expect(
            wrapper.findAll('.ui-avatar').every(avatar => avatar.html().includes('rounded-full'))
        ).toBe(true);
    });
});
