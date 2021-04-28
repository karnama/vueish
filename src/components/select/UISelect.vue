<template>
    <div ref="selectComp"
         :class="{ 'cursor-not-allowed': disabled }"
         class="ui-select text-default relative group outline-none"
         role="listbox"
         :aria-disabled="disabled"
         :aria-valuetext="selectionDisplay"
         v-bind="$attrs">
        <!--Clickable area showing the current value and opens the list-->
        <div class="current-selection cursor-pointer select-none border-b flex justify-between"
             :class="{
                 'text-muted cursor-not-allowed focus:outline-none': disabled
             }"
             tabindex="0"
             @keydown.space="openList"
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

            <span v-else-if="clearable && selectionDisplay"
                  class="opacity-0 clear-icon h-5 w-5 cursor-pointer right-0 top-1 group-hover:opacity-100
                         transition-opacity text-gray-500 relative -mr-5 group-hover:mr-0 -mt-1 transition-spacing"
                  aria-controls=""
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
                <div v-if="header || $slots.header" class="px-2 py-1 text-sm bg-dark border-b select-none">
                    <slot name="header">
                        {{ header }}
                    </slot>
                </div>

                <!--Search input to filter the list-->
                <div v-if="!noSearch" class="p-2 bg-dark">
                    <input ref="searchInput"
                           v-model="search"
                           tabindex="-1"
                           class="appearance-none bg-transparent w-full leading-tight
                              focus:outline-none transition-text-color pb-2"
                           name="search">
                </div>

                <!--Options available for selection-->
                <ul role="list">
                    <li v-for="(option, index) in filteredOptions"
                        :key="option[optionLabel] + '-' + index"
                        :ref="el => { if (el) listElements[index] = el }"
                        :aria-selected="currentlySelected = isSelected(option)"
                        class="option cursor-pointer bg-default hover:bg-gray-100 relative
                               justify-center focus:bg-brand-200 outline-none"
                        :class="{
                            'selected-option bg-gray-200': currentlySelected,
                            'border-t': index > 0 || !noSearch && index === 0
                        }"
                        role="option"
                        tabindex="0"
                        @keydown.up="listElements[index-1]?.focus()"
                        @keydown.down="listElements[index+1]?.focus()"
                        @keydown.enter="select(option)"
                        @click.stop="select(option)">
                        <div class="flex justify-between">
                            <div class="p-2">
                                <slot name="option" :option="option">
                                    {{ option[optionLabel] }}
                                </slot>
                            </div>

                            <div v-if="currentlySelected && (clearable && !multi)
                                     || multi && clearable && currentlySelected
                                     || multi && currentlySelected && Array.isArray(selected) && selected.length > 1"
                                 class="flex items-center justify-between p-2 px-3">
                                <span class="clear-icon h-5 w-5 cursor-pointer text-gray-500"
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
import { computed, defineComponent, onMounted, ref, onUnmounted, nextTick, onBeforeUpdate } from 'vue';
import { isEqual as _isEqual, cloneDeep } from 'lodash-es';
import type { PropType } from 'vue';
import { placeholder, autofocus, clearable, disabled, useVModel, label } from '@composables/input';
import { getIcon, wrap } from '@/helpers';
import { MaybeArray } from '@/types';
import clickAway from '@/directives/clickAway';

type Option = Record<string, any>;

export default defineComponent({
    name: 'UISelect',

    directives: { clickAway },

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
        optionLabel: {
            type: String,
            default: 'name'
        },

        /**
         * The key on the options to compare the objects by.
         * Otherwise if set to 'whole' The objects will
         * be compared based on deep equality.
         */
        optionKey: {
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
         * Disable the searching feature.
         */
        noSearch: {
            type: Boolean,
            default: false
        },

        /**
         * Function to use when evaluating a search term.
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

        label,
        placeholder,
        clearable,
        autofocus,
        disabled
    },

    emits: ['update:modelValue'],

    setup(props) {
        const search = ref('');
        const open = ref(false);
        const searchInput = ref<HTMLInputElement>();
        const selectComp = ref<HTMLDivElement>();
        const list = ref<HTMLDivElement>();
        const selected = useVModel<MaybeArray<Option> | null>(props);
        const lockIcon = getIcon('lock');
        const clearIcon = getIcon('clear');
        const selectionDisplay = computed<string>(() => {
            if (!selected.value) {
                return '';
            }

            const options = wrap<Option>(cloneDeep(selected.value));
            return options.map(option => option[props.optionLabel]).join(', ');
        });
        const filteredOptions = computed<Option[]>(() => {
            if (!search.value) {
                return props.options ?? [];
            }

            const options = selected.value ? wrap(cloneDeep(selected.value)) : [];

            (props.options ?? [])
                // exclude already selected
                .filter(option => !options.find(opt => isEqual(option, opt)))
                .forEach(option => {
                    const isHit = props.searchClosure
                        ? props.searchClosure(option, search.value)
                        : (option[props.optionLabel] as string).toLowerCase().includes(search.value.toLowerCase());

                    if (isHit) {
                        options.push(option);
                    }
                });

            return options;
        });
        const style = ref<Partial<CSSStyleDeclaration>>({});
        const listElements = ref<HTMLLIElement[]>([]);

        const closeList = async () => {
            await nextTick();
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
                || !props.clearable && !props.multi
                // or not clearable multi-select with only one value
                || !props.clearable && props.multi && (selected.value as Option[]).length === 1
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
            return props.optionKey === 'whole'
                ? _isEqual(previous, next)
                : _isEqual(previous[props.optionKey], next[props.optionKey]);
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
            const selectRect = selectComp.value!.getBoundingClientRect();
            const listRect = list.value!.getBoundingClientRect();

            if (!selectRect || !listRect) {
                return {};
            }

            const offset = 5;
            // const fitsOnTheBottom = listRect.height >= innerHeight - selectRect.y + selectRect.height + offset;
            style.value = {
                width: `${selectRect.width}px`,
                left: `${selectRect.x}px`,
                zIndex: '9999',
                top: `${selectRect.y + selectRect.height + offset}px`
            };
        };

        onMounted(async () => {
            if (props.autofocus) {
                await openList();
            }
        });

        onBeforeUpdate(() => {
            listElements.value = [];
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
            listElements,
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
