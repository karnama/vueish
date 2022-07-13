<template>
    <div :key="page"
         class="flex flex-wrap justify-start items-center space-x-2 space-y-2"
         role="navigation"
         aria-label="Pagination navigation">
        <UIButton id="previous-page-button"
                  :disabled="disabled || !hasPrevious"
                  aria-label="Previous Page"
                  class="mt-2 flex flex-col justify-center items-center"
                  :style="buttonStyle"
                  @click="page === 1 ? undefined : setPage(page - 1)">
            <span class="rotate-90" v-html="chevronIcon" />
        </UIButton>
        <UIButton id="page-1-button"
                  :aria-current="isCurrent = page === 1"
                  :theme="isCurrent ? 'brand' : 'default'"
                  :disabled="disabled"
                  :outline="!isCurrent"
                  :style="buttonStyle"
                  :aria-label="isCurrent ? 'Current Page, Page 1' : 'Go to page 1'"
                  :title="isCurrent ? 'Current Page, Page 1' : 'Go to page 1'"
                  @click="setPage(1)">
            1
        </UIButton>
        <div v-if="pages[0] !== 2"
             class="select-none dark:text-gray-300"
             :class="{ 'tracking-widest': large, 'tracking-tighter': small }">
            ...
        </div>
        <UIButton v-for="pageNum in pages"
                  :id="`page-${pageNum}-button`"
                  :key="pageNum"
                  :aria-current="isCurrent = pageNum === page"
                  :theme="isCurrent ? 'brand' : 'default'"
                  :outline="!isCurrent"
                  :style="buttonStyle"
                  :aria-label="isCurrent ? 'Current Page, Page ' + pageNum : 'Go to page ' + pageNum"
                  :title="isCurrent ? 'Current Page, Page ' + pageNum : 'Go to page ' + pageNum"
                  :disabled="disabled"
                  @click="setPage(pageNum)">
            {{ pageNum }}
        </UIButton>
        <div v-if="startPagesFrom + Number(visibleCount) < Number(length)"
             class="select-none dark:text-gray-300"
             :class="{ 'tracking-widest': large }">
            ...
        </div>
        <UIButton v-if="Number(length) > 1"
                  :id="`page-${length}-button`"
                  :aria-current="isCurrent = page === Number(length)"
                  :theme="isCurrent ? 'brand' : 'default'"
                  :disabled="disabled"
                  :style="buttonStyle"
                  :outline="!isCurrent"
                  :aria-label="isCurrent ? 'Current Page, Page ' + length : 'Go to page ' + length"
                  :title="isCurrent ? 'Current Page, Page ' + length : 'Go to page ' + length"
                  @click="setPage(Number(length))">
            {{ length }}
        </UIButton>
        <UIButton id="next-page-button"
                  :disabled="disabled || !hasNext"
                  aria-label="Next Page"
                  :style="buttonStyle"
                  class="flex flex-col justify-center items-center"
                  @click="page === Number(length) ? undefined : setPage(page + 1)">
            <span class="-rotate-90" v-html="chevronIcon" />
        </UIButton>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { disabled, large, small } from '@/shared-props';
import { useVModel } from 'composables/reactivity';
import { getIcon } from '@/helpers';
import UIButton from 'components/button/UIButton.vue';

export default defineComponent({
    name: 'UIPagination',

    components: { UIButton },

    props: {
        /**
         * The current page.
         *
         * @default 1
         */
        modelValue: {
            type: Number,
            default: 1,
            validator: (val: number) => Number.isInteger(val) && val >= 0
        },

        /**
         * The number of pages.
         */
        length: {
            type: [Number, String],
            required: true,
            validator: (val: number | string) => {
                val = Number(val);
                return !isNaN(val) && Number.isInteger(val) && val > 0;
            }
        },

        /**
         * The total number of page buttons to show.
         *
         * @default 3
         */
        visibleCount: {
            type: [Number, String],
            default: 3,
            validator: (val: number | string) => {
                val = Number(val);
                const isValid = !isNaN(val) && Number.isInteger(val) && val >= 0;

                if (isValid && val % 2 !== 1) {
                    throw new Error('visibleCount expected to be an odd number.');
                }

                return isValid;
            }
        },

        disabled,
        large,
        small
    },

    emits: ['update:modelValue'],

    setup: (props) => {
        const chevronIcon = getIcon('chevron');

        const page = useVModel<number>(props);
        const hasPrevious = computed(() => page.value > 1);
        const hasNext = computed(() => page.value < Number(props.length));
        const startPagesFrom = computed(() => {
            const sideLength = Math.floor(Number(props.visibleCount) / 2);

            if (page.value <= sideLength + 1) {
                return 2;
            }

            if (page.value >= Number(props.length) - sideLength) {
                return Number(props.length) - Number(props.visibleCount);
            }

            if (Number(props.length) === Number(props.visibleCount)) {
                return page.value - sideLength - 1;
            }
            return page.value - sideLength;
        });
        const pages = computed(() => {
            return Array.from(
                { length: Number(props.visibleCount) },
                (_, index) => index + startPagesFrom.value
            )
                .filter(pageNum => pageNum > 1 && pageNum < Number(props.length));
        });
        const buttonStyle = computed<Partial<CSSStyleDeclaration>>(() => ({
            padding: '0 5px !important',
            minWidth: props.large ? '50px' : props.small ? '30px' : '40px',
            height: props.large ? '50px' : props.small ? '30px' : '40px'
        }));

        const setPage = (pageNum: number) => {
            if (pageNum === page.value) return;

            page.value = pageNum;
        };

        return {
            page,
            hasPrevious,
            startPagesFrom,
            setPage,
            hasNext,
            chevronIcon,
            pages,
            buttonStyle
        };
    }
});
</script>
