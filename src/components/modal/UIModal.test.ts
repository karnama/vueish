import UIModal from './UIModal.vue';
import { mount } from '@vue/test-utils';

let wrapper: ReturnType<typeof mount> & { vm: { open: CallableFunction }};

describe('UIModal', () => {
    it('should renders', () => {
        const wrapper = mount(UIModal);
        expect(wrapper).toBeDefined();
        expect(wrapper.exists()).toBe(true);
    });

    it('should display the actions slot content',  () => {
        wrapper = mount(UIModal, {
            slots: {
                actions: '<div id="actions">actions</div>'
            }
        }) as typeof wrapper;

        wrapper.vm.open();
        console.log(wrapper.html());
        expect(wrapper.find('#actions').text()).toBe('actions');
    });

    it('should emit closed on click outside or cancel click', () => {

    });

    it('should emit accepted on accept click', () => {

    });

    it('should execute callbacks if given', () => {

    });

    it('should display the labels defined by the prop', () => {

    });

    it('should display the header slot content', () => {

    });

    it('should display the footer slot content', () => {

    });

    it('should display the header prop content', () => {

    });

    it('should display the footer prop content', () => {

    });

    it('should display the default slot content', () => {

    });

    it('should opan and close using methods through the reference', () => {

    });
});
