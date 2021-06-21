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

    // jsdom has no FileList interface implemented
    describe.skip('file validation', () => {
        // const file = new File(['foo'], 'foo.txt', {
        //     type: 'text/plain'
        // });

        // const jsdomUtils = require('jsdom/lib/jsdom/living/generated/utils');
        // const jsdomFileList = require('jsdom/lib/jsdom/living/generated/FileList');
        // function makeFileList(...files: File[]) {
        //     const impl = jsdomFileList.createImpl(window);
        //     const ret = Object.assign([...files], {
        //         item: (ix: number) => ret[ix],
        //         [jsdomUtils.implSymbol]: impl
        //     });
        //     impl[jsdomUtils.wrapperSymbol] = ret;
        //     Object.setPrototypeOf(ret, FileList.prototype);
        //     return ret;
        // }

        // also test the emitted error
        /**
         * @jest-environment ./src/components/file-uploader/file-env
         */
        // can't be spending more time on this
        // eslint-disable-next-line jest/no-disabled-tests
        it.skip('should filter out duplicate files', async () => {
            const wrapper = mount(UIFileUploader, {
                props: {
                    upload,
                    remove
                }
            });

            const input = wrapper.get('input');
            // const data = new DataTransfer();
            // data.items.add(file);
            // data.items.add(file);
            // input.element.files = makeFileList(file, file);
            // Object.defineProperty(input.element, 'files', {
            //     value: [file, file],
            //     writable: true
            // });
            await input.trigger('change');

            expect(wrapper.lastEventValue('validationError')).toStrictEqual([{
                messages: ''
            }]);
        });

        it.todo('should filter out files larger than the given prop');

        it.todo('should not exceed the file count if given as prop');
    });
});
