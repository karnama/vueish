import { debouncedRef, useVModel } from './index';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, ref } from 'vue';
import type { PropType } from 'vue';
import { disableConsoleWarn, enableConsoleWarn } from 'helpers/test';
import UIInput from 'components/input/UIInput.vue';

describe('input', () => {
    describe('useVModel', () => {
        // eslint-disable-next-line vue/one-component-per-file
        const Comp = defineComponent({
            name: 'TestComp',
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

            expect(wrapper.emitted('update:myProp')).toBeDefined();
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

        describe('should react to prop being set', () => {
            it('should react in the template', async () => {
                const wrapper = mount(Comp, {
                    props: {
                        'onUpdate:modelValue': async (modelValue: any) => await wrapper.setProps({ modelValue })
                    }
                });

                expect(wrapper.text()).toBe('1');
                await wrapper.trigger('click');
                expect(wrapper.lastEventValue()).toStrictEqual([2]);

                await wrapper.setProps({ modelValue: 1 });
                expect(wrapper.text()).toBe('1');
                await wrapper.trigger('click');
                expect(wrapper.lastEventValue()).toStrictEqual([2]);
            });

            it('should react when binding to input', async () => {
                // eslint-disable-next-line vue/one-component-per-file
                const component = defineComponent({
                    name: 'TestComp',

                    components: { UIInput },

                    setup: () => {
                        const model = ref('value');

                        return { model };
                    },

                    template: '<input id="input" v-model="model" />' +
                        '<UIInput :model-value="model" name="display-input" @keydown.prevent />'
                });

                const wrapper = mount(component);

                expect(wrapper.find<HTMLInputElement>('#display-input').element.value).toBe('value');
                await wrapper.find('#input').setValue('test');
                // it updates the model value
                expect(wrapper.vm.model).toBe('test');
                // it should not emit an update when receiving a prop change
                expect(wrapper.lastEventValue()).not.toStrictEqual(['test']);
                expect(wrapper.lastEventValue()).toBeUndefined();
                expect(wrapper.find<HTMLInputElement>('#display-input').element.value).toBe('test');
            });
        });

        it('should emit mutations for object literals', () => {
            jest.useFakeTimers();
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
                    model.value.key = { test: 1 };
                    setTimeout(() => model.value.key.test = 2, 0);
                },
                render: () => h('div')
            });

            expect(wrapper.lastEventValue()).toStrictEqual([{ key: { test: 1 } }]);
            jest.runAllTimers();
            expect(wrapper.lastEventValue()).toStrictEqual([{ key: { test: 2 } }]);
            jest.useRealTimers();
        });

        it('should emit mutations for arrays', () => {
            jest.useFakeTimers();
            const wrapper = mount({
                props: {
                    modelValue: {
                        type: Array as PropType<number[]>,
                        default: () => []
                    }
                },
                emits: ['update:modelValue'],
                setup(props) {
                    const model = useVModel<Record<string, any>>(props);
                    model.value.push(1);
                    setTimeout(() => model.value.pop(), 0);
                },
                render: () => h('div')
            });

            expect(wrapper.lastEventValue()).toStrictEqual([[1]]);
            jest.runAllTimers();
            expect(wrapper.lastEventValue()).toStrictEqual([[]]);
            jest.useRealTimers();
        });
    });

    describe('debouncedRef', () => {
        it('should update the ref only after the timeout', async () => {
            jest.useFakeTimers();
            const myRef = debouncedRef(1);
            myRef.value = 2;
            await nextTick();
            expect(myRef.value).toBe(1);
            jest.runAllTimers();
            expect(myRef.value).toBe(2);
        });
    });
});
