import { mount } from '@vue/test-utils';
import tooltip from './index';

describe('tooltip', () => {
    it('should apply the correct attributes', () => {
        const wrapper = mount({
            directives: {
                tooltip
            },
            template: '<div v-tooltip="\'my-text\'" />'
        });

        expect(wrapper.attributes('data-v-tooltip')).toBe('my-text');
        expect(wrapper.attributes('data-v-tooltip-y-position')).toBe('top');
    });

    it('should take the latest positioning values only', () => {
        const wrapper = mount({
            directives: {
                tooltip
            },
            template: '<div v-tooltip.bottom.top.left.right="\'my-text\'" />'
        });

        expect(wrapper.attributes('data-v-tooltip-y-position')).toBe('top');
        expect(wrapper.attributes('data-v-tooltip-x-position')).toBe('right');
    });
});
