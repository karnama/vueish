import UISpinnerLoader from './UISpinnerLoader.vue';
import { mount } from '@vue/test-utils';

const props = {
    progress: 38,
    steps: 76,
    stroke: 10,
    diameter: 75,
    determinate: true
};

describe('UISpinner', () => {
    it('should render', () => {
        const wrapper = mount(UISpinnerLoader);

        expect(wrapper).toBeDefined();
        expect(wrapper.exists()).toBe(true);
    });

    it('should be display the given slot', () => {
        const wrapper = mount(UISpinnerLoader, {
            slots: {
                default: '<div id="default-slot-content" />'
            }
        });

        expect(wrapper.find('#default-slot-content').exists()).toBe(true);
    });

    it('should display with the right dimensions', () => {
        const wrapper = mount(UISpinnerLoader, { props });

        expect(wrapper.find('svg').attributes()['style']).toBe('width: 75px; height: 75px;');
    });

    it('should calculate the radius of the circle correctly', () => {
        const wrapper = mount(UISpinnerLoader, { props });

        const radius = String((props.diameter - props.stroke) / 2);
        expect(wrapper.find('circle').attributes()['r']).toBe(radius);
    });

    it('should dynamically update the stroke width', async () => {
        const wrapper = mount(UISpinnerLoader, { props });

        expect(wrapper.find('circle').attributes()['stroke-width']).toBe(String(props.stroke) + 'px');
        await wrapper.setProps({ stroke: 5 });
        expect(wrapper.find('circle').attributes()['stroke-width']).toBe('5px');
    });

    it('should dynamically update the progress', async () => {
        const getStrokeOffsetStyle = (progress?: number) => {
            progress = progress ?? props.progress;
            const radius = (props.diameter - props.stroke) / 2;
            const circumference = Math.PI * 2 * radius;
            const step = circumference / Number(props.steps);

            return `stroke-dashoffset: ${circumference - step * progress}px`;
        };

        const wrapper = mount(UISpinnerLoader, { props });
        const circle = wrapper.find('circle');

        expect(circle.attributes()['style']).toContain(getStrokeOffsetStyle());
        await wrapper.setProps({ progress: 99 });
        expect(circle.attributes()['style']).toContain(getStrokeOffsetStyle(99));
    });

    it('should dynamically update the diameter', async () => {
        const radius = (diameter: number) => String((diameter - props.stroke) / 2);
        const wrapper = mount(UISpinnerLoader, { props });

        expect(wrapper.find('circle').attributes()['r']).toBe(radius(props.diameter));
        await wrapper.setProps({ diameter: 50 });
        expect(wrapper.find('circle').attributes()['r']).toBe(radius(50));

        expect(wrapper.find('svg').attributes()['viewBox']).toBe('0 0 50 50');
    });

    it('should not apply default colour classes when inherit-color is passed', async () => {
        const wrapper = mount(UISpinnerLoader);

        expect(wrapper.find('.ui-spinner-loader').classes('text-brand-400')).toBe(true);
        await wrapper.setProps({ inheritColor: true });
        expect(wrapper.find('.ui-spinner-loader').classes('text-brand-400')).toBe(false);
    });
});
