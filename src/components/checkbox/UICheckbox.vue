<template>
    <label class="relative flex items-center" :for="$attrs.id ?? name">
        <input :id="$attrs.id ?? name"
               type="checkbox"
               class="hidden"
               :name="name"
               v-bind="$attrs"
               :disabled="disabled"
               :checked="isChecked"
               @click="toggleValue">

        <span class="ui-checkbox rounded flex justify-center items-center
                     transition-all text-white cursor-pointer border-2"
              :class="{
                  'bg-brand-600': isChecked && !indeterminate,
                  'bg-brand-500': isChecked && indeterminate
              }">
            <svg class="transition-all opacity-0 fill-current scale-0"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"
                 width="15"
                 height="10"
                 xml:space="preserve">
                <path v-if="!indeterminate"
                      d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,
                        264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,
                        135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,
                        75.496z" />
                <path v-else
                      d="M394,154.174c-5.331-5.33-11.806-7.995-19.417-7.995H27.406c-7.611,0-14.084,2.665-19.414,
                    7.995 C2.662,159.503,0,165.972,0,173.587v54.82c0,7.617,2.662,14.086,7.992,19.41c5.33,5.332,11.803,
                    7.994,19.414,7.994h347.176 c7.611,0,14.086-2.662,19.417-7.994c5.325-5.324,
                    7.991-11.793,7.991-19.41v-54.82C401.991,165.972,399.332,159.5,394,154.174z" />
            </svg>

        </span>

        <span class="select-none ml-3 cursor-pointer"
              :class="{ 'cursor-not-allowed': disabled }">
            <slot>
                {{ label }}
            </slot>
        </span>
    </label>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { label, disabled, name } from '@composables/input/input';
import { SetupArg, SetupReturn } from '@/types';
import { isEqual } from 'lodash-es';

// todo - update icons
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

        value: [Object, String, Array, Boolean, Number],
        label,
        disabled,
        name
    },

    emits: ['update:modelValue'],

    setup(props: SetupArg<{ modelValue: any[] | boolean }>, { emit }): SetupReturn {
        if (Array.isArray(props.modelValue) && !props.value) {
            throw new Error('\'value\' is required if the v-model  value is an array.');
        }

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

            emit('update:modelValue', modelValue);
        };

        return {
            toggleValue,
            isChecked
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
        & > svg {
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
