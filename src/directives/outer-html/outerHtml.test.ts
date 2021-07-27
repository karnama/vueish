import { mount } from '@vue/test-utils';
import outerHtml from './index';

describe('outer-html', () => {
    // skipped for now as vtu retains the template tag
    it.skip('should replace the template tag', () => {
        const wrapper = mount({
            directives: {
                outerHtml
            },
            template: '<div><template v-outer-html="html" /></div>',
            data: () => ({ html: '<div>test</div>' })
        });

        expect(wrapper.html()).toBe('<div><div>test</div></div>');
    });

    it('should insert the html directly after the origin', () => {
        const wrapper = mount({
            directives: {
                outerHtml
            },
            template: '<div v-outer-html="html">origin<span>after</span></div>',
            data: () => ({ html: '<div>test</div>' })
        });

        expect(wrapper.html()).toBe('<div>origin<span>after</span></div>\n<div>test</div>');
    });

    // skipped in case in the future a way is devised to make this reactive
    it.skip('should be reactive', () => {
        const wrapper = mount({
            directives: {
                outerHtml
            },
            template: '<div><template v-outer-html="html" /></div>',
            data: () => ({ html: '<div>test</div>' }),
            mounted() {
                setTimeout(() => this.html = '<div>updated test</div>');
            }
        });

        expect(wrapper.html()).toBe('<div><div>test</div></div>');
    });
});
