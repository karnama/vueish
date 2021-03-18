<template>
    <div :key="page"
         class="flex flex-wrap justify-between items-center max-w-max space-x-2"
         role="navigation"
         aria-label="Pagination navigation">
        <button :class="{ 'hover:bg-gray-200': !disabled && hasPrevious }"
                class="mt-2 p-2 bg-white border border-gray-200 disabled:opacity-50 disabled:bg-gray-300
                       disabled:cursor-not-allowed rounded transition transform rotate-90"
                :disabled="disabled || !hasPrevious"
                aria-label="Previous Page"
                @click="previous"
                v-html="chevronIcon" />
        <button v-for="pageNum in pages"
                :key="pageNum"
                :aria-label="pageNum === page ? 'Current Page, Page ' + pageNum : 'Go to page ' + pageNum"
                :aria-current="pageNum === page"
                :disabled="disabled"
                :class="{
                    'text-white bg-blue-500 shadow-none cursor-default': pageNum === page,
                    'hover:bg-gray-200': !disabled && pageNum !== page
                }"
                class="mt-2 px-4 py-2 shadow bg-white disabled:cursor-not-allowed
                       disabled:opacity-50 rounded transition"
                @click="pageNum !== page ? page = pageNum : null"
                v-text="pageNum" />
        <button :class="{ 'hover:bg-gray-200': !disabled && hasNext }"
                class="mt-2 p-2 bg-white border border-gray-200 disabled:opacity-50 disabled:bg-gray-300
                       disabled:cursor-not-allowed rounded transition transform rotate-270"
                :disabled="disabled || !hasNext"
                aria-label="Next Page"
                @click="next"
                v-html="chevronIcon" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useVModel, disabled } from '@composables/input';
import { getIcon } from '@/helpers';

export default defineComponent({
    name: 'UIPagination',
    props: {
        /**
         * The current page.
         */
        modelValue: {
            type: Number,
            default: 1
        },

        /**
         * The number of pages.
         */
        length: {
            type: [Number, String],
            required: true,
            validator: (val: number|string) => {
                val = Number(val);

                return !isNaN(val) && Number.isInteger(val);
            }
        },

        /**
         * The total number of page buttons to show.
         */
        totalVisible: {
            type: [Number, String],
            default: 3,
            validator: (val: number|string) => {
                val = Number(val);
                return !isNaN(val) && Number.isInteger(val) && val >= 0;
            }
        },

        disabled
    },

    emits: ['update:modelValue', 'previous', 'next'],

    setup(props, ctx) {
        const chevronIcon = getIcon('chevron');

        const page = useVModel(props);
        const hasPrevious = computed(() => page.value > 1);
        const hasNext = computed(() => page.value < Number(props.length));
        const pages = computed(() => {
            const all = [...Array(Number(props.length) + 1).keys()].slice(1);
            const maxVisible = Number(props.totalVisible);
            const pageIndex = page.value - 1;

            if (maxVisible % 2 === 1) {
                const sides = Math.floor(maxVisible / 2);
                return all.slice(pageIndex - sides, pageIndex + sides + 1);
            }

            return all.slice(pageIndex, pageIndex + maxVisible);
        });

        const next = () => {
            if (!hasNext.value) return;

            page.value++;
            ctx.emit('next', page.value);
        };
        const previous = () => {
            if (!hasPrevious.value) return;

            page.value--;
            ctx.emit('previous', page.value);
        };

        return {
            page,
            hasPrevious,
            hasNext,
            next,
            previous,
            chevronIcon,
            pages
        };
    }
});
</script>
