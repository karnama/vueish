import { mount } from '@vue/test-utils';
import UIFile from '@components/file-uploader/UIFile.vue';
import { nextTick } from 'vue';

describe('UIFile', () => {
    const file = new File(['foo'], 'foo.txt', {
        type: 'text/plain'
    });
    const upload = () => {};

    it('should display correctly', () => {
        const wrapper = mount(UIFile, {
            props: {
                file,
                upload
            }
        });

        expect(wrapper.element).toMatchSnapshot();
    });

    it('should display the size in the kb or mb', async () => {
        const wrapper = mount(UIFile, {
            props: {
                file,
                upload
            }
        });

        expect(wrapper.html()).toContain('0.0029 KB');
        const newFile = new File([Array(100000).fill('foo').join()], 'foo.txt', {
            type: 'text/plain'
        });

        await wrapper.setProps({ file: newFile });
        expect(wrapper.html()).toContain('0.38 MB');
    });

    it('should emit an event with the removed file on remove', async () => {
        const wrapper = mount(UIFile, {
            props: {
                file,
                upload
            }
        });

        await wrapper.get('button').trigger('click');

        expect(wrapper.lastEventValue<[File]>('removed')![0].size).toStrictEqual(file.size);
    });

    // tried mocking the reader.result too to no avail
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should display an image if the file is an image', async () => {
        const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3a' +
            'AAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=';
        const imgFile = new File(['data:image/png;base64,' + base64], '1x1.png', {
            type: 'image/png'
        });
        const wrapper = mount(UIFile, {
            props: {
                file: imgFile,
                upload
            }
        });

        expect(wrapper.find('img').isVisible()).toBe(true);
        await wrapper.setProps({ file });
        expect(wrapper.find('img').isVisible()).toBe(false);
    });

    it('should call the given upload if uploading on mounted', () => {
        const upload = jest.fn();
        mount(UIFile, {
            props: {
                file,
                upload
            }
        });

        expect(upload).not.toHaveBeenCalled();

        mount(UIFile, {
            props: {
                file,
                upload,
                uploadOnMounted: true
            }
        });

        expect(upload).toHaveBeenCalledWith(file);
    });
});
