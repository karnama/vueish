import { mount } from '@vue/test-utils';
import UISkeleton from 'components/skeleton/UISkeleton.vue';

describe('UISkeleton', () => {
    it('should display correctly', () => {
        let wrapper = mount(UISkeleton, {
            props: {
                pulse: false
            }
        });

        expect(wrapper.element).toMatchSnapshot();

        wrapper = mount(UISkeleton, {
            props: {
                pulse: true
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });
});
