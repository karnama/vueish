<template>
    <div ref="selectComp"
         :class="{ 'cursor-not-allowed': disabled }"
         class="text-default relative group outline-none"
         role="list"
         :aria-disabled="disabled"
         :aria-valuetext="selectionDisplay"
         v-bind="$attrs">
        <!--Clickable area showing the current value and opens the list-->
        <div class="current-selection cursor-pointer select-none border-b flex justify-between"
             :class="{
                 'text-muted cursor-not-allowed': disabled
             }"
             tabindex="0"
             @keydown.space.prevent="openList"
             @keydown.tab="closeList"
             @click="open ? closeList() : openList()">
            <slot name="selected" :selected="selected">
                <span v-if="selectionDisplay">
                    {{ selectionDisplay }}
                </span>

                <span v-else class="opacity-50">
                    {{ placeholder }}
                </span>
            </slot>

            <span v-if="disabled"
                  class="h-5 w-5 text-gray-400"
                  v-html="lockIcon" />

            <span v-else-if="!noClear && selectionDisplay"
                  class="opacity-0 clear-icon h-5 w-5 cursor-pointer right-0 top-1 group-hover:opacity-100
                         transition-opacity text-gray-500 relative -mr-5 group-hover:mr-0 -mt-1 transition-spacing"
                  @click.stop="clearSelection(undefined)"
                  v-html="clearIcon" />
        </div>

        <!--List of available options-->
        <teleport to="body">
            <div v-if="open"
                 ref="list"
                 v-click-away="closeList"
                 class="list overflow-y-scroll absolute w-full border bg-white shadow-md"
                 :style="style"
                 @keydown.esc="closeList">
                <!--Header to display instructions-->
                <div class="px-2 py-1 text-sm bg-dark border-b select-none">
                    <slot name="header">
                        {{ header }}
                    </slot>
                </div>

                <!--Search input to filter the list-->
                <div class="p-2 bg-dark">
                    <input ref="searchInput"
                           v-model="search"
                           tabindex="-1"
                           class="appearance-none bg-transparent w-full leading-tight
                              focus:outline-none transition-text-color pb-2"
                           name="search">
                </div>

                <!--Options available for selection-->
                <ul>
                    <li v-for="(option, index) in filteredOptions"
                        :key="option[labelKey] + '-' + index"
                        class="option border-t cursor-pointer bg-default hover:bg-gray-100 relative
                               justify-center focus:bg-brand-200"
                        :class="{'selected-option bg-gray-200': isSelected(option)}"
                        role="option"
                        tabindex="0"
                        :aria-selected="isSelected(option)"
                        @keydown.enter="select(option)"
                        @click.stop="select(option)">
                        <div class="flex justify-between">
                            <div class="p-2">
                                <slot name="option" :option="option">
                                    {{ option[labelKey] }}
                                </slot>
                            </div>

                            <div class="flex items-center  justify-between p-2 px-3">
                                <span v-if="isSelected(option)"
                                      class="clear-icon h-5 w-5 cursor-pointer text-gray-500"
                                      @click.stop="clearSelection(option)"
                                      v-html="clearIcon" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, onUnmounted, nextTick } from 'vue';
import { isEqual as _isEqual, cloneDeep } from 'lodash-es';
import type { PropType } from 'vue';
import { placeholder, autofocus, noClear, disabled, useVModel } from '@composables/input';
import { getIcon, wrap } from '@/helpers';
import { MaybeArray } from '@/types';
// @ts-expect-error
import { directive } from 'vue3-click-away';

// todo - accessibility
// todo - review header prop

type Option = Record<string, any>;

export default defineComponent({
    name: 'UISelect',

    directives: {
        clickAway: directive
    },

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [Object, Array] as PropType<MaybeArray<Option> | null>
        },

        /**
         * Array of option objects.
         */
        options: {
            type: Array as () => Option[],
            required: true
        },

        /**
         * The key to find the label by on the options.
         */
        labelKey: {
            type: String,
            default: 'name'
        },

        /**
         * The key on the options to compare the objects by.
         * Otherwise if set to 'whole' The objects will
         * be compared based on deep equality.
         */
        compareKey: {
            type: String,
            default: 'id'
        },

        /**
         * String to display at the top of the
         * open list.
         */
        header: {
            type: String,
            default: 'Select an option'
        },

        /**
         * Function to use when evaluating a strm.
         */
        searchClosure: {
            type: Function as PropType<(o: Option, term: string) => boolean>
        },

        /**
         * Property indicating whether multiple values can be selected or not.
         */
        multi: {
            type: Boolean,
            default: false
        },

        placeholder,
        noClear,
        autofocus,
        disabled
    },

    emits: ['update:modelValue'],

    setup(props) {
        const search = ref('');
        const open = ref(false);
        const searchInput = ref<HTMLInputElement>(null);
        const selectComp = ref<HTMLInputElement>();
        const list = ref<HTMLDivElement>();
        const selected = useVModel<MaybeArray<Option> | null>(props);
        const lockIcon = getIcon('lock');
        const clearIcon = getIcon('clear');
        const selectionDisplay = computed<string>(() => {
            if (!selected.value) {
                return '';
            }

            const options = wrap<Option>(cloneDeep(selected.value));
            return options.map(option => option[props.labelKey]).join(', ');
        });
        const filteredOptions = computed<Option[]>(() => {
            const options = selected.value ? wrap(cloneDeep(selected.value)) : [];

            (props.options ?? [])
                // exclude already selected
                .filter(option => !options.find(opt => isEqual(option, opt)))
                .forEach(option => {
                    const isHit = props.searchClosure
                        ? props.searchClosure(option, search.value)
                        : (option[props.labelKey] as string).toLowerCase().includes(search.value.toLowerCase());

                    if (isHit) {
                        options.push(option);
                    }
                });

            return options;
        });
        const style = ref<Partial<CSSStyleDeclaration>>({});

        const closeList = async (event?: Event) => {
            await nextTick();
            if (
                event && (event.target as Element)?.contains(document.activeElement)
                || event && list.value?.contains(document.activeElement)
            ) {
                return;
            }

            open.value = false;
            search.value = '';
            window.removeEventListener('resize', setPosition);
        };
        const openList = async () => {
            if (props.disabled) return;

            open.value = true;
            await nextTick();
            setPosition();
            searchInput.value?.focus();
            window.addEventListener('resize', setPosition);
        };
        const clearSelection = (option?: Option) => {
            if (
                // nothing to clear
                !selected.value || Array.isArray(selected.value) && selected.value.length === 0
                // or not clearable single select
                || props.noClear && !props.multi
                // or not clearable multi-select with only one value
                || props.noClear && props.multi && (selected.value as Option[]).length === 1
            ) {
                return;
            }

            if (option && props.multi) {
                selected.value = (selected.value as Option[]).filter(opt => !isEqual(opt, option));
                return;
            }

            selected.value = props.multi ? [] : null;
        };
        const isEqual = (previous: Option, next: Option): boolean => {
            return props.compareKey === 'whole'
                ? _isEqual(previous, next)
                : _isEqual(previous[props.compareKey], next[props.compareKey]);
        };
        const isSelected = (option: Option) => {
            const values = selected.value ? wrap(cloneDeep(selected.value)) : [];

            return values.findIndex(selectedOption => isEqual(selectedOption, option)) !== -1;
        };
        const select = async (option: Option) => {
            if (isSelected(option)) {
                return;
            }

            if (!props.multi) {
                selected.value = option;
                await closeList();
                return;
            }

            if (!Array.isArray(selected.value)) {
                selected.value = selected.value ? [selected.value, option] : [option];
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            selected.value = [...selected.value, option];
        };
        const setPosition = () => {
            const rectangle = selectComp.value?.getBoundingClientRect();

            if (!rectangle) {
                return {};
            }

            style.value = {
                width: String(rectangle.width) + 'px',
                top: String(rectangle.y + rectangle.height + 5) + 'px',
                left: String(rectangle.x) + 'px'
            };
        };

        onMounted(async () => {
            if (props.autofocus) {
                await openList();
            }
        });

        onUnmounted(() => {
            // in case it's unmounted while open
            window.removeEventListener('resize', setPosition);
        });

        return {
            search,
            open,
            list,
            selectComp,
            style,
            searchInput,
            selected,
            lockIcon,
            clearIcon,
            filteredOptions,
            selectionDisplay,
            select,
            closeList,
            openList,
            clearSelection,
            isSelected
        };
    }
});
</script>

<style scoped lang="scss">
.list {
    max-height: 400px;
}
</style>
