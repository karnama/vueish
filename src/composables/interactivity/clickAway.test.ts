import { DOMWrapper, mount } from '@vue/test-utils';
import clickAway from './clickAway';
import { ref } from 'vue';

describe('clickAway', () => {
    it('should trigger the given method on clicking outside', async () => {
        jest.useFakeTimers();
        const mockFn = jest.fn();
        document.body.innerHTML = '<div id="outside" /> ';

        const wrapper = mount({
            template: '<div id="inside" v-click-away="mockFn"><span id="content" /></div>',
            directives: { clickAway },
            setup: () => ({ mockFn }),
            attachTo: '#outside'
        });
        jest.runAllTimers();


        await wrapper.get('#content').trigger('click');
        expect(mockFn).not.toHaveBeenCalled();
        await wrapper.get('#inside').trigger('click');
        expect(mockFn).not.toHaveBeenCalled();

        const outside = new DOMWrapper(document.getElementById('outside')!);
        await outside.trigger('click');
        expect(mockFn).toHaveBeenCalled();
        jest.useRealTimers();
    });

    it('should work with touch events', async () => {
        jest.useFakeTimers();
        document.ontouchstart = () => null;
        document.body.innerHTML = '<div id="outside" /> ';
        const mockFn = jest.fn();

        mount({
            template: '<div id="inside" v-click-away="mockFn"><span id="content" /></div> ',
            directives: { clickAway },
            setup: () => ({ mockFn }),
            attachTo: '#outside'
        });
        jest.runAllTimers();

        const outside = new DOMWrapper(document.getElementById('outside')!);
        await outside.trigger('touchstart');
        expect(mockFn).toHaveBeenCalled();

        jest.useRealTimers();
        document.ontouchstart = null;
    });

    // todo - update when a scenario can be implemented when the callback changes
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should be reactive to the value change', async () => {
        let count = 0;
        jest.useFakeTimers();
        const mockFn = ref(jest.fn(() => count++));
        document.body.innerHTML = '<div id="outside" /> ';

        mount({
            template: '<div id="inside" v-click-away="mockFn"><span id="content" /></div> ',
            directives: { clickAway },
            setup: () => ({ mockFn: mockFn.value }),
            attachTo: '#outside'
        });
        jest.runAllTimers();

        const outside = new DOMWrapper(document.getElementById('outside')!);
        await outside.trigger('click');
        expect(count).toBe(1);

        jest.spyOn(mockFn, 'value').mockImplementation(() => count--);
        await outside.trigger('click');
        expect(count).toBe(0);

        jest.useRealTimers();
    });
});
