import { mount } from '@vue/test-utils';
import UISkeleton from 'components/skeleton/UISkeleton.vue';

describe('UISkeleton', () => {
    it('should display correctly', () => {
        const wrapper  = mount(UISkeleton);

        expect(wrapper.element).toMatchSnapshot();
    });
});
