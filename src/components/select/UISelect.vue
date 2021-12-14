<template>
    <div :class="{ 'cursor-not-allowed': disabled }"
         class="ui-select relative group outline-none">
        <UIExpandTransition>
            <label v-if="label || $slots.label"
                   :for="$attrs.id ?? name"
                   class="font-medium text-color inline-flex"
                   :class="{ 'text-color-error': error || $slots.error }">
                <slot name="label">
                    {{ label }}
                </slot>
            </label>
        </UIExpandTransition>

        <!--Clickable area showing the current value and opens the list-->
        <div :id="$attrs.id ?? name"
             ref="selectComp"
             class="current-selection text-color cursor-pointer select-none flex items-center justify-between
                    shadow-sm dark:shadow-md border border-gray-300 dark:border-gray-500 rounded
                    bg-white dark:bg-gray-600 transition p-3.5"
             role="textbox"
             contenteditable="false"
             aria-multiline="false"
             :aria-disabled="disabled"
             :aria-valuetext="selectionDisplay"
             :class="{
                 'bg-gray-200 dark:!bg-gray-700 text-color-muted cursor-not-allowed focus:outline-none': disabled,
                 'px-7 py-5': large
             }"
             tabindex="0"
             @keydown.space="openList"
             @click="open ? closeList() : openList()">
            <slot name="selected" :selected="selected">
                <span v-if="selectionDisplay">
                    {{ selectionDisplay }}
                </span>

                <span v-else>
                    {{ placeholder }}
                </span>
            </slot>

            <UIFadeTransition duration-out="duration-100" duration-in="duration-100">
                <span v-if="disabled"
                      class="h-5 w-5 text-color-muted"
                      :class="{ '-mr-3.5': large }"
                      v-html="lockIcon" />

                <button v-else-if="clearable && selectionDisplay"
                        class="clear-icon h-5 w-5 cursor-pointer text-color-muted"
                        :class="{ '-mr-3.5': large }"
                        :aria-controls="$attrs.id ?? name"
                        aria-roledescription="clear"
                        @click.stop="clearSelection(undefined)"
                        v-html="clearIcon" />
            </UIFadeTransition>
        </div>

        <UIExpandTransition>
            <slot v-if="error || $slots.error" name="error">
                <p class="text-color-error text-sm">
                    {{ error }}
                </p>
            </slot>
        </UIExpandTransition>

        <!--List of available options-->
        <teleport to="body">
            <div v-if="open"
                 ref="list"
                 v-click-away="closeList"
                 role="listbox"
                 class="list overflow-y-scroll absolute w-full border text-color
                        bg-white dark:bg-gray-600 dark:border-gray-500 shadow-md"
                 :style="style"
                 @keydown.esc="closeList">
                <!--Header to display instructions-->
                <div class="flex items-center justify-between px-2 py-1 text-sm border-b select-none">
                    <slot name="header">
                        {{ header }}
                    </slot>
                    <div v-if="multi"
                         class="flex-1 text-right"
                         :data-has-selected="hasSelected = selectionCount > 0"
                         :data-not-all-selected="notAllSelected = selectionCount < options.length">
                        <button v-if="notAllSelected" class="x-select-all" @click="selected = options">
                            Select All
                        </button>
                        <span v-if="notAllSelected && hasSelected"> / </span>
                        <button v-if="hasSelected" class="x-select-none" @click="selected = []">
                            Select None
                        </button>
                    </div>
                </div>

                <!--Search input to filter the list-->
                <div v-if="!noSearch" class="p-2">
                    <input ref="searchInput"
                           v-model="search"
                           tabindex="-1"
                           class="appearance-none bg-transparent w-full leading-tight
                                  focus:outline-none transition-text-color"
                           name="search">
                </div>

                <!--Options available for selection-->
                <ul role="list">
                    <li v-for="(option, index) in filteredOptions"
                        :key="option[optionLabel] + '-' + index"
                        :ref="el => { if (el) listElements[index] = el }"
                        :aria-selected="currentlySelected = isSelected(option)"
                        class="option cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 relative
                               justify-center focus:bg-brand-200 dark:focus:bg-brand-500 outline-none"
                        :class="{
                            'selected-option bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-500': currentlySelected,
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
                                     || multi && currentlySelected && selectionCount > 1"
                                 class="flex items-center justify-between p-2 px-3">
                                <span class="clear-icon h-5 w-5 cursor-pointer text-color-muted"
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
import { placeholder, autofocus, clearable, disabled, useVModel, label, name, error } from 'composables/input';
import { large } from 'composables/style';
import { getIcon, wrap } from '@/helpers';
import type { MaybeArray } from 'types/utilities';
import clickAway from '@/directives/click-away';
import UIFadeTransition from 'components/transitions/UIFadeTransition.vue';
import UIExpandTransition from 'components/transitions/UIExpandTransition.vue';

type Option = Record<string, any>;

export default defineComponent({
    name: 'UISelect',

    directives: { clickAway },

    components: { UIFadeTransition, UIExpandTransition },

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
        disabled,
        name,
        large,
        error
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
        const selectionCount = computed(() => {
            if (!selected.value) return 0;

            const options = Array.isArray(selected.value) ? selected.value : [selected.value];

            return options.length;
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
            searchInput.value?.focus({ preventScroll: true });
            window.addEventListener('resize', setPosition);
        };
        const clearSelection = (option?: Option) => {
            if (
                // nothing to clear
                selectionCount.value === 0
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
            const fitsOnTheBottom = listRect.height <= innerHeight - (selectRect.y + selectRect.height + offset);
            const above = scrollY + selectRect.top - offset - listRect.height;
            const below = scrollY + selectRect.bottom + offset;

            style.value = {
                width: `${selectRect.width}px`,
                left: `${selectRect.x}px`,
                zIndex: '9999',
                top: `${fitsOnTheBottom ? below : above}px`
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
            selectionCount,
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
