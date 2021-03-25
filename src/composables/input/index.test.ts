import { useVModel } from '@composables/input/index';
import { mount } from '@vue/test-utils';
import { defineComponent, h, PropType } from 'vue';
import { disableConsoleWarn, enableConsoleWarn } from '@helpers/test';

describe('index', () => {
    describe('useVModel', () => {
        const Comp = defineComponent({
            name: 'Comp',
            props: {
                modelValue: {
                    type: Number,
                    default: 1
                }
            },

            emits: ['update:modelValue'],
            setup(props) {
                const model = useVModel<number>(props);
                const increment = () => model.value++;
                return {
                    model,
                    increment
                };
            },

            template: '<button @click="increment">{{ model }}</button>'
        });

        it('should emit the optionally given prop name', () => {
            const wrapper = mount({
                props: {
                    myProp: {
                        type: Number,
                        default: 1
                    }
                },
                emits: ['update:myProp'],
                setup(props) {
                    const model = useVModel<number>(props, 'myProp');
                    model.value++;
                },
                render: () => h('div')
            });

            expect(wrapper.emitted('update:myProp')).not.toBeUndefined();
        });

        it('should thrown an error if not called within a lifecycle hook', () => {
            expect(() => useVModel({})).toThrow(
                new Error('useVModel must be called from the setup or lifecycle hook methods.')
            );
        });

        it('should throw an error if trying to use the method without a value', () => {
            disableConsoleWarn();
            expect(() => mount({
                props: {
                    modelValue: Number
                },
                setup(props) {
                    useVModel(props);
                }
            })).toThrow(new Error('Attempted to use useVModel without value.'));
            enableConsoleWarn();
        });

        it('should work if prop is not defined', async () => {
            const wrapper = mount(Comp);

            expect(wrapper.text()).toBe('1');
            await wrapper.trigger('click');
            expect(wrapper.text()).toBe('2');
        });

        it('should react to prop being set', async () => {
            const wrapper = mount(Comp);

            expect(wrapper.text()).toBe('1');
            await wrapper.trigger('click');
            expect(wrapper.text()).toBe('2');

            await wrapper.setProps({ modelValue: 1 });
            expect(wrapper.text()).toBe('1');
            await wrapper.trigger('click');
            expect(wrapper.text()).toBe('2');
        });

        // eslint-disable-next-line jest/no-disabled-tests
        it.skip('should emit mutations', () => {
            const wrapper = mount({
                props: {
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                emits: ['update:modelValue'],
                setup(props) {
                    const model = useVModel<Record<string, any>>(props);
                    model.value.test = 1;
                },
                render: () => h('div')
            });

            expect(wrapper.emitted('update:modelValue')).toBe([[1]]);
        });
    });
});
