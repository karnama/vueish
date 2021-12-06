import UILinearLoader from './UILinearLoader.vue';
import { mount } from '@vue/test-utils';
import { disableConsoleWarn, enableConsoleWarn } from 'helpers/test';

let wrapper: ReturnType<typeof mount>;

describe('UILinearLoader', () => {
    beforeEach(() => {
        wrapper = mount(UILinearLoader, {
            props: {
                steps: 10,
                progress: 1,
                height: 5
            }
        });
    });

    it('should render correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should render correctly when set to determinate', async () => {
        await wrapper.setProps({ determinate: true });
        expect(wrapper.element).toMatchSnapshot();
    });

    it('should set the height of the element by props', () => {
        expect(getComputedStyle(wrapper.element).height).toBe('5px');
    });

    it('should calculate the correct width', async () => {
        await wrapper.setProps({ determinate: true });
        expect(wrapper.vm.width).toBe('10%');
    });

    it('should throw and error on logical errors in the passed props', () => {
        disableConsoleWarn();

        let failingFunc = () => {
            mount(UILinearLoader, {
                props: {
                    determinate: true
                }
            });
        };
        expect(failingFunc).toThrow(new TypeError(
            'UILinearLoader - The prop is set to finite loading without giving a number of steps'
        ));

        failingFunc = () => {
            mount(UILinearLoader, {
                props: {
                    determinate: true,
                    steps: 10,
                    progress: 11
                }
            });
        };
        expect(failingFunc).toThrow(new TypeError('UILinearLoader  - The progress cannot be higher that the steps'));

        enableConsoleWarn();
    });
});
