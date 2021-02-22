<template>
    <div class="flex items-center" :class="classes">
        <input :id="$attrs.id ?? name"
               type="checkbox"
               class="hidden"
               :name="name"
               v-bind="$attrs"
               :disabled="disabled"
               :checked="isChecked"
               @click="toggleValue">
        <span class="ui-checkbox rounded flex justify-center items-center
                 transition-all text-white border-2 cursor-pointer"
              :class="{
                  'bg-brand-600': isChecked && !indeterminate,
                  'bg-gray-400': isChecked && indeterminate
              }"
              @click="toggleValue">
            <span class="transition-all opacity-0 scale-0 text-white" v-html="indeterminate ? dashIcon : tickIcon" />
        </span>
        <label v-if="label || $slots.default" class="items-center" :for="$attrs.id ?? name">
            <span class="select-none ml-3 cursor-pointer"
                  :class="{ 'cursor-not-allowed': disabled }">
                <slot>
                    {{ label }}
                </slot>
            </span>
        </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { label, disabled, name, value } from '@composables/input';
import { classes } from '@composables/style';
import { isEqual } from 'lodash-es';
import { getIcon } from '@/helpers';

export default defineComponent({
    name: 'UICheckbox',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [Boolean, Array],
            default: false
        },

        indeterminate: {
            type: Boolean,
            default: false
        },

        classes,
        value,
        label,
        disabled,
        name
    },

    emits: ['update:modelValue'],

    setup(props, ctx) {
        if (Array.isArray(props.modelValue) && !props.value) {
            throw new Error('\'value\' is required if the v-model  value is an array.');
        }

        const dashIcon = getIcon('dash');
        const tickIcon = getIcon('tick');

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
            tickIcon
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
