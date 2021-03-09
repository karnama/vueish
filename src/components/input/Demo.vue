<template>
    <h1 class="text-2xl mb-12 text-center">
        UIInput
    </h1>
    <UICheckbox v-model="large"
                name="large"
                label="Large Style"
                class="mb-6" />

    <div class="space-y-10">
        <UIInput v-model="text"
                 clearable
                 name="ui-text"
                 :large="large"
                 placeholder="Some instructions..."
                 label="Field Label" />

        <div>
            <UIInput v-model="text"
                     name="ui-text"
                     label="Standard"
                     :large="large"
                     no-clear />
            <small>Output: {{ text }}</small>
        </div>

        <UIInput v-model="number"
                 name="ui-text4"
                 type="number"
                 autofocus
                 :large="large"
                 min="10"
                 max="100"
                 step="0.01"
                 placeholder=""
                 label="Number" />

        <UIInput v-model="password"
                 name="ui-text9"
                 type="password"
                 clearable
                 :large="large"
                 label="Password" />

        <UIInput v-model="disabled"
                 name="ui-text3"
                 label="Disabled"
                 :large="large"
                 disabled />

        <UIInput v-model="prefixProp"
                 name="ui-text5"
                 :large="large"
                 label="Prefix (Using prop)"
                 prefix="Reason:" />

        <UIInput v-model="prefixSlot"
                 name="ui-text6"
                 :large="large"
                 label="Prefix (Using slot)">
            <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     class="h-5 w-5">
                    <path stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </template>
        </UIInput>

        <UIInput v-model="suffixProp"
                 name="ui-text6"
                 :large="large"
                 label="Suffix (Using prop)"
                 suffix="kg" />

        <UIInput v-model="suffixSlot"
                 name="ui-text7"
                 class="mt-10"
                 :large="large"
                 label="Suffix (Using slot)">
            <template #suffix>
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     class="h-5 w-5">
                    <path stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3
                              9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
            </template>
        </UIInput>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIInput from './UIInput.vue';
import UICheckbox from '@components/checkbox/UICheckbox.vue';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Input',
    components: { UICheckbox, UIInput },
    setup() {
        const text = ref('I\'m a input input!');
        const disabled = ref('Can\'t touch this!');
        const number = ref(123);
        const password = ref('password123');
        const prefixProp = ref('Because');
        const prefixSlot = ref('Billions');
        const suffixProp = ref('100');
        const suffixSlot = ref('Feather-weight');
        const large = ref(false);

        return {
            text,
            disabled,
            number,
            password,
            prefixProp,
            prefixSlot,
            suffixProp,
            suffixSlot,
            large
        };
    }
});
</script>
