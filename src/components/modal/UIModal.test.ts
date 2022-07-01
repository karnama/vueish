import UIModal from './UIModal.vue';
import { mount } from '@vue/test-utils';

describe('UIModal', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should render correctly', async () => {
        const wrapper = mount(UIModal, {
            slots: {
                default: 'Default slot content',
                actions: 'Actions slot content',
                header: 'Header slot content'
            }
        });

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();

        expect(document.querySelector('.wrapper')).toMatchSnapshot();
    });

    it('should display the actions slot content', async () => {
        const wrapper = mount(UIModal, {
            slots: {
                actions: '<div id="test-actions" />'
            }
        });

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();

        expect(document.getElementById('test-actions')).not.toBeNull();
        wrapper.unmount();
    });

    it('should emit closed on click outside', async () => {
        const wrapper = mount(UIModal);

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        document.querySelector<HTMLDivElement>('.ui-modal-overlay')?.click();

        expect(wrapper.emitted()['cancel']).toHaveLength(1);
        wrapper.unmount();
    });

    it('should emit closed on cancel click', async () => {
        const wrapper = mount(UIModal);

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        document.querySelector<HTMLButtonElement>('.ui-modal-close')?.click();

        expect(wrapper.emitted()['cancel']).toHaveLength(1);
        wrapper.unmount();
    });

    it('should emit accepted on accept click', async () => {
        const wrapper = mount(UIModal, {
            props: {
                acceptButtonLabel: 'acceptBtn'
            }
        });

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        let button: HTMLButtonElement | undefined;
        document.querySelectorAll('button').forEach(btn => {
            if (btn.innerHTML.includes('acceptBtn')) {
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

    it('should display the labels defined by the prop', async () => {
        const wrapper = mount(UIModal, {
            props: {
                acceptButtonLabel: 'acceptBtn',
                closeButtonLabel: 'closeBtn'
            }
        });

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        let count = 0;
        document.querySelectorAll('button').forEach(button => {
            if (button.innerHTML.includes('acceptBtn') || button.innerHTML.includes('closeBtn')) {
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

        // @ts-expect-error - ts reckons this has the type never
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

        // @ts-expect-error - ts reckons this has the type never
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

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        expect(document.querySelector('.ui-modal')?.innerHTML).toContain('header-content');
        wrapper.unmount();
    });

    it('should display the default slot content', async () => {
        const wrapper = mount(UIModal, {
            slots: {
                default: '<div id="default-content" />'
            }
        });

        // @ts-expect-error - ts reckons this has the type never
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
        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        expect(document.getElementById('default-content')).not.toBeNull();

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.close();
        expect(document.getElementById('default-content')).toBeNull();
        wrapper.unmount();
    });

    it('should not close the modal when closeCallback given', async () => {
        const wrapper = mount(UIModal, {
            slots: {
                default: '<div id="default-content" />'
            },
            props: {
                closeCallback: () => {}
            }
        });

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        expect(document.querySelector('#default-content')).not.toBeNull();
        document.querySelector<HTMLButtonElement>('.ui-modal-close')?.click();
        expect(document.querySelector('#default-content')).not.toBeNull();
        wrapper.unmount();
    });

    it('should pass the closing logic to the closeCallback', async () => {
        const mockFn = jest.fn(() => {});
        const wrapper = mount(UIModal, {
            slots: {
                default: '<div id="default-content" />'
            },
            props: {
                closeCallback: mockFn
            }
        });

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        document.querySelector<HTMLButtonElement>('.ui-modal-close')?.click();
        expect(mockFn).toHaveBeenCalledWith(expect.any(Function), false);

        // @ts-expect-error - ts reckons this has the type never
        await wrapper.vm.open();
        document.querySelector<HTMLButtonElement>('.ui-modal-accept')?.click();
        expect(mockFn).toHaveBeenCalledWith(expect.any(Function), true);

        wrapper.unmount();
    });
});
