<template>
    <div :key="page"
         class="flex flex-wrap justify-between items-center max-w-max space-x-2"
         role="navigation"
         aria-label="Pagination navigation">
        <UIButton id="previous-page-button"
                  :disabled="disabled || !hasPrevious"
                  aria-label="Previous Page"
                  class="rotate-90 !p-1"
                  @click="page === 1 ? undefined : setPage(page - 1)"
                  v-html="chevronIcon" />
        <UIButton id="page-1-button"
                  :aria-current="isCurrent = page === 1"
                  :category="isCurrent ? 'primary' : 'default'"
                  :disabled="disabled"
                  :outline="!isCurrent"
                  class="page-button"
                  :aria-label="isCurrent ? 'Current Page, Page 1' : 'Go to page 1'"
                  :title="isCurrent ? 'Current Page, Page 1' : 'Go to page 1'"
                  @click="setPage(1)">
            1
        </UIButton>
        <div v-if="pages[0] !== 2" class="select-none">
            ...
        </div>
        <UIButton v-for="pageNum in pages"
                  :id="`page-${pageNum}-button`"
                  :key="pageNum"
                  :aria-current="isCurrent = pageNum === page"
                  :category="isCurrent ? 'primary' : 'default'"
                  :outline="!isCurrent"
                  class="page-button"
                  :aria-label="isCurrent ? 'Current Page, Page ' + pageNum : 'Go to page ' + pageNum"
                  :title="isCurrent ? 'Current Page, Page ' + pageNum : 'Go to page ' + pageNum"
                  :disabled="disabled"
                  @click="setPage(pageNum)">
            {{ pageNum }}
        </UIButton>
        <div v-if="startPagesFrom + Number(visibleCount) < Number(length)" class="select-none">
            ...
        </div>
        <UIButton v-if="Number(length) > 1"
                  :id="`page-${length}-button`"
                  :aria-current="isCurrent = page === Number(length)"
                  :category="isCurrent ? 'primary' : 'default'"
                  :disabled="disabled"
                  class="page-button"
                  :outline="!isCurrent"
                  :aria-label="isCurrent ? 'Current Page, Page ' + length : 'Go to page ' + length"
                  :title="isCurrent ? 'Current Page, Page ' + length : 'Go to page ' + length"
                  @click="setPage(Number(length))">
            {{ length }}
        </UIButton>
        <UIButton id="next-page-button"
                  :disabled="disabled || !hasNext"
                  aria-label="Next Page"
                  class="rotate-270 !p-1"
                  @click="page === Number(length) ? undefined : setPage(page + 1)"
                  v-html="chevronIcon" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useVModel, disabled } from 'composables/input';
import { getIcon } from '@/helpers';
import UIButton from 'components/button/UIButton.vue';

export default defineComponent({
    name: 'UIPagination',

    components: { UIButton },

    props: {
        /**
         * The current page.
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

        disabled
    },

    emits: ['update:modelValue'],

    setup(props) {
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
            pages
        };
    }
});
</script>

<style>
.page-button {
    min-width: 40px;
    padding: 0 5px !important;
    height: 38px;
}
</style>
