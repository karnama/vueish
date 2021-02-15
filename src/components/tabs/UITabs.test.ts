import { disableConsoleWarn, enableConsoleWarn } from '@helpers/test';
import { mount } from '@vue/test-utils';
import UITab from '@components/tabs/UITab.vue';
import UITabs from '@components/tabs/UITabs.vue';

describe('UITab', () => {
    it('should throw an error if no title is given', () => {
        disableConsoleWarn();
        let failingFunc = () => mount(UITab);
        expect(failingFunc).toThrow(new Error('The title prop or slot is required when using UITab.'));

        failingFunc = () => mount(UITab, {
            props: {
                title: 'title'
            }
        });
        expect(failingFunc).not.toThrow(new Error('The title prop or slot is required when using UITab.'));

        failingFunc = () => mount(UITab, {
            slots: {
                title: 'title'
            }
        });
        expect(failingFunc).not.toThrow(new Error('The title prop or slot is required when using UITab.'));

        enableConsoleWarn();
    });
});

describe('UITabs', () => {
    it('should throw an error if less then 2 child given in the default slot', () => {
        disableConsoleWarn();

        const failingFunc = () => mount(UITabs, {
            slots: {
                default: '<UITab><template #title>title</template></UITab>'
            }
        });

        expect(failingFunc).toThrow(new Error('UITabs expect at least 1 UITab in the default slot.'));
        enableConsoleWarn();
    });

    it('should throw an error if no title have been given to any of the UITabs', () => {
        disableConsoleWarn();

        const failingFunc = () => mount(UITabs, {
            slots: {
                default: '<UITab title="title"></UITab><UITab></UITab>'
            }
        });

        expect(failingFunc).toThrow(new Error('UITabs expect at least 1 UITab in the default slot.'));

        enableConsoleWarn();
    });

    it.todo('should display the titles from the slotted content');

    it.todo('should switch tabs when clicking on the title');

    it.todo('should accept both text and components in the UITab\'s default slot');
});
