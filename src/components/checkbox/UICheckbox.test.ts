import UICheckbox from './UICheckbox.vue';
import { mount } from '@vue/test-utils';

describe('UICheckbox', () => {
    it('should render', () => {
        const wrapper = mount(UICheckbox);

        expect(wrapper).toBeDefined();
        expect(wrapper.exists()).toBe(true);
    });

    it.todo('should toggle array value when v-model is array');

    it.todo('should throw error on invalid prop logic');

    it.todo('should update when clicked on');

    it.todo('should display the label when given as prop');

    it.todo('should display the label when given in default slot');
});
