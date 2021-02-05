import UIModal from './UIModal.vue';
import { mount } from '@vue/test-utils';

describe('UIModal', () => {
    it('should renders', () => {
        const wrapper = mount(UIModal);
        expect(wrapper).toBeDefined();
        expect(wrapper.exists()).toBe(true);
        wrapper.unmount();
    });

    it('should display the actions slot content',  async () => {
        const wrapper = mount(UIModal, {
            slots: {
                actions: '<div id="test-actions" />'
            }
        });

        // @ts-expect-error
        await wrapper.vm.open();

        expect(document.getElementById('test-actions')).not.toBeNull();
        wrapper.unmount();
    });

    it('should emit closed on click outside or cancel click', async () => {
        const wrapper = mount(UIModal);

        // @ts-expect-error
        await wrapper.vm.open();
        // @ts-expect-error
        await document.querySelector('.overlay')?.click();

        expect(wrapper.emitted()['cancel']).toHaveLength(1);
        wrapper.unmount();
    });

    it('should emit accepted on accept click', async () => {
        const wrapper = mount(UIModal, {
            props: {
                acceptButtonLabel: 'acceptBtn'
            }
        });

        // @ts-expect-error
        await wrapper.vm.open();
        let button: HTMLButtonElement | undefined;
        document.querySelectorAll('button').forEach(btn => {
            if (btn.innerHTML === 'acceptBtn') {
                button = btn;
            }
        });

        if (button) {
            button.click();
        } else {
            throw new Error('Button not found in DOM');
        }

        expect(wrapper.emitted()['accept']).toHaveLength(1);
        wrapper.unmount();
    });

    it('should execute callbacks if given', async () => {
        const func = jest.fn();
        const wrapper = mount(UIModal, {
            props: {
                acceptButtonLabel: 'acceptBtn',
                accept: func
            }
        });

        // @ts-expect-error
        await wrapper.vm.open();
        let button: HTMLButtonElement | undefined;
        document.querySelectorAll('button').forEach(btn => {
            if (btn.innerHTML === 'acceptBtn') {
                button = btn;
            }
        });

        if (button) {
            button.click();
        } else {
            throw new Error('Button not found in DOM');
        }

        expect(func).toHaveBeenCalled();
        wrapper.unmount();
    });

    it('should display the labels defined by the prop', async () => {
        const wrapper = mount(UIModal, {
            props: {
                acceptButtonLabel: 'acceptBtn',
                closeButtonLabel: 'closeBtn'
            }
        });

        // @ts-expect-error
        await wrapper.vm.open();
        let count = 0;
        document.querySelectorAll('button').forEach(button => {
            if (button.innerHTML === 'acceptBtn' || button.innerHTML === 'closeBtn') {
                count++;
            }
        });
        expect(count).toBe(2);
        wrapper.unmount();
    });

    it('should display the header slot content', async () => {
        const wrapper = mount(UIModal, {
            slots: {
                header: '<div id="header-content" />'
            }
        });

        // @ts-expect-error
        await wrapper.vm.open();
        expect(document.getElementById('header-content')).not.toBeNull();
        wrapper.unmount();
    });

    it('should display the footer slot content', async () => {
        const wrapper = mount(UIModal, {
            slots: {
                footer: '<div id="footer-content" />'
            }
        });

        // @ts-expect-error
        await wrapper.vm.open();
        expect(document.getElementById('footer-content')).not.toBeNull();
        wrapper.unmount();
    });

    it('should display the header prop content', async () => {
        const wrapper = mount(UIModal, {
            props: {
                header: 'header-content'
            }
        });

        // @ts-expect-error
        await wrapper.vm.open();
        expect(document.querySelector('.modal')?.innerHTML).toContain('header-content');
        wrapper.unmount();
    });

    it('should display the default slot content', async () => {
        const wrapper = mount(UIModal, {
            slots: {
                default: '<div id="default-content" />'
            }
        });

        // @ts-expect-error
        await wrapper.vm.open();
        expect(document.getElementById('default-content')).not.toBeNull();
        wrapper.unmount();
    });

    it('should open and close using methods through the reference', async () => {
        const wrapper = mount(UIModal, {
            slots: {
                default: '<div id="default-content" />'
            }
        });

        expect(document.getElementById('default-content')).toBeNull();
        // @ts-expect-error
        await wrapper.vm.open();
        expect(document.getElementById('default-content')).not.toBeNull();

        // @ts-expect-error
        await wrapper.vm.close();
        expect(document.getElementById('default-content')).toBeNull();
        wrapper.unmount();
    });
});
