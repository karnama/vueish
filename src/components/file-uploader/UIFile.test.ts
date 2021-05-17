import { mount } from '@vue/test-utils';
import UIFile from '@components/file-uploader/UIFile.vue';

describe('UIFile', () => {
    const file = new File(['foo'], 'foo.txt', {
        type: 'text/plain'
    });
    const upload = jest.fn();

    it('should display correctly', () => {
        const wrapper = mount(UIFile, {
            props: {
                file,
                upload
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it.todo('should display the size in the kb or mb');

    it.todo('should emit an event with the removed file on remove');

    it.todo('should display an image if the file is an image');
});
