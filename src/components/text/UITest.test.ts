import { mount } from '@vue/test-utils';
//@ts-ignore - TODO: Investigate "module not found error"
import UIText from './UIText.vue';

describe('UIText', () => {
    it('should handle model-binding correctly', async() => {
        const wrapper = mount({
            template: '<div><UIText v-model="input" name="text"/></div>',
            components: { UIText },
            props: {},
            data() {
                return { input: '' };
            }
        });

        await wrapper.find('input').setValue('my@mail.com');
        await wrapper.find('input').trigger('update');

        expect(wrapper.vm.input).toBe('Hello World');
    });
});
