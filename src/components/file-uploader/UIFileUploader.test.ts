import { mount } from '@vue/test-utils';
import UIFileUploader from './UIFileUploader.vue';

describe('UIFileUploader', () => {
    const upload = () => {};
    const remove = upload;
    it('should display correctly', () => {
        const wrapper = mount(UIFileUploader, {
            props: {
                upload,
                remove
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    describe('file validation', () => {
        // also test the emitted error
        it.todo('should filter out duplicate files');

        it.todo('should filter out files larger than the given prop');

        it.todo('should not exceed the file count if given as prop');
    });
});
