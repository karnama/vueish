import { mount } from '@vue/test-utils';
import UIApp from './UIApp.vue';
import { portalId } from './UIAppExports';

describe('UIApp', () => {
    it('should add a portal target as the body\'s last element', () => {
        mount(UIApp);
        expect(document.body.lastElementChild?.id).toBe(portalId);
    });

    it('should render the child components', () => {
        mount(UIApp, {
            slots: {
                default: {
                    template: '<div id="child" />'
                }
            }
        });

        expect(document.getElementById('child')).not.toBeUndefined();
    });
});
