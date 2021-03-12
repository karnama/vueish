import { mount } from '@vue/test-utils';
import clickAway from './clickAway';

// waiting on https://github.com/vuejs/vue-test-utils-next/issues/456
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('clickAway', () => {
    it('should trigger the given method on clicking outside', async () => {
        jest.useFakeTimers();
        const mockFn = jest.fn();

        const wrapper = mount({
            template: '<div id="outside"><div id="inside" v-click-away="mockFn"><span id="content" /></div></div>',
            directives: { clickAway },
            setup: () => ({ mockFn })
        });
        jest.runAllTimers();

        await wrapper.get('#content').trigger('click');
        expect(mockFn).not.toHaveBeenCalled();
        await wrapper.get('#inside').trigger('click');
        expect(mockFn).not.toHaveBeenCalled();

        await wrapper.get('#outside').trigger('click');
        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(MouseEvent);
        jest.useRealTimers();
    });

    it('should work with touch events', async () => {
        jest.useFakeTimers();
        document.ontouchstart = () => null;
        const mockFn = jest.fn();

        const wrapper = mount({
            template: '<div id="outside"><div id="inside" v-click-away="mockFn"><span id="content" /></div></div>',
            directives: { clickAway },
            setup: () => ({ mockFn })
        });
        jest.runAllTimers();

        await wrapper.get('#outside').trigger('touchstart');
        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith(TouchEvent);

        jest.useRealTimers();
        document.ontouchstart = null;
    });

    it.todo('should be reactive to the value change');
});
