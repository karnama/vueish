<template>
    <div class="flex items-center" :class="$attrs.class" :style="$attrs.style">
        <input :id="$attrs.id ?? name"
               type="checkbox"
               class="hidden"
               :name="name"
               v-bind="omit($attrs, ['class', 'style'])"
               :disabled="disabled"
               :checked="isChecked"
               @click="toggleValue">
        <span class="ui-checkbox rounded flex justify-center items-center flex-shrink-0
                 transition-all text-white border-2 cursor-pointer"
              :class="{
                  'bg-brand-600': isChecked && !indeterminate,
                  'bg-gray-400': isChecked && indeterminate,
                  '!border-2 border-red-700 dark:border-red-500': error || $slots.error
              }"
              @click="toggleValue">
            <span class="transition-all opacity-0 scale-0 text-white" v-html="indeterminate ? dashIcon : checkIcon" />
        </span>
        <label v-if="label || $slots.default"
               class="items-center cursor-pointer text-color ml-3"
               :class="{ 'cursor-not-allowed': disabled }"
               :for="$attrs.id ?? name">
            <slot>
                {{ label }}
            </slot>
        </label>
    </div>
    <UIExpandTransition>
        <slot v-if="error || $slots.error" name="error">
            <p class="text-color-error text-sm">
                {{ error }}
            </p>
        </slot>
    </UIExpandTransition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { label, disabled, name, error } from 'composables/input';
import { isEqual, omit } from 'lodash-es';
import { getIcon } from '@/helpers';
import UIExpandTransition from 'components/transitions/UIExpandTransition.vue';

export default defineComponent({
    name: 'UICheckbox',

    components: { UIExpandTransition },

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [Boolean, Array],
            default: false
        },

        /**
         * The checkbox when checked uses indeterminate styling.
         */
        indeterminate: {
            type: Boolean,
            default: false
        },

        value: {
            type: [String, Boolean, Array, Object, Number]
        },

        label,
        disabled,
        name,
        error
    },

    emits: ['update:modelValue'],

    setup(props, ctx) {
        if (Array.isArray(props.modelValue) && !props.value) {
            throw new Error('\'value\' is required if the v-model value is an array.');
        }

        const dashIcon = getIcon('dash');
        const checkIcon = getIcon('check');

        const isChecked = computed(() => {
            if (Array.isArray(props.modelValue)) {
                return !!props.modelValue.filter(value => isEqual(value, props.value)).length;
            } else {
                return props.modelValue;
            }
        });

        const toggleValue = () => {
            let modelValue = props.modelValue;

            if (Array.isArray(modelValue)) {
                if (isChecked.value) {
                    modelValue = modelValue.filter(value =>  !isEqual(value, props.value));
                } else {
                    modelValue.push(props.value);
                }
            } else {
                modelValue = !modelValue;
            }

            ctx.emit('update:modelValue', modelValue);
        };

        return {
            toggleValue,
            isChecked,
            dashIcon,
            checkIcon,
            omit
        };
    }
});
</script>

<style scoped lang="scss">
.ui-checkbox {
    height: 25px;
    width: 25px;
}
input:checked {
    /* fixme: target the aria attribute error message or invalid and only set border none if attributes are not there */
    & + .ui-checkbox {
        border: none;
        & > span {
            @apply opacity-100 scale-100;
        }
    }
}

input:disabled + span.ui-checkbox {
    @apply cursor-not-allowed;
    filter: grayscale(100%) brightness(200%);
}

.dark input:disabled + span.ui-checkbox {
    filter: grayscale(100%) brightness(100%);
}
</style>
