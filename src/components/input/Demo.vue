<template>
    <div class="flex justify-evenly mb-6">
        <UICheckbox v-model="large"
                    name="large"
                    label="Large Style" />
        <UICheckbox v-model="small"
                    name="small"
                    label="Small Style" />
        <UICheckbox v-model="loading"
                    name="loading"
                    label="Loading" />

        <UIButton theme="red" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <div class="space-y-10">
        <UIInput v-model="text"
                 :loading="loading"
                 name="ui-text1"
                 :large="large"
                 :error="error"
                 :small="small"
                 placeholder="Some instructions..."
                 label="Default Field" />

        <UIInput v-model="clearable"
                 :loading="loading"
                 name="ui-text2"
                 :clearable="isClearable"
                 :error="error"
                 :small="small"
                 :label="(isClearable ? '' : 'Not ') + 'Clearable'"
                 :large="large"
                 no-clear />

        <UIInput v-model="search"
                 :loading="loading"
                 name="ui-text3"
                 :large="large"
                 :error="error"
                 :small="small"
                 type="search"
                 autofocus
                 label="Search type" />

        <UIInput v-model="tel"
                 :loading="loading"
                 name="ui-text4"
                 :large="large"
                 :error="error"
                 :small="small"
                 type="tel"
                 label="Tel type" />

        <UIInput v-model="url"
                 :loading="loading"
                 name="ui-text5"
                 :large="large"
                 :error="error"
                 :small="small"
                 type="url"
                 label="Url type" />

        <UIInput v-model="email"
                 :loading="loading"
                 name="ui-text6"
                 :large="large"
                 :error="error"
                 :small="small"
                 type="email"
                 label="Email type" />

        <UIInput v-model="number"
                 :loading="loading"
                 name="ui-text7"
                 disabled
                 type="number"
                 :large="large"
                 min="10"
                 max="100"
                 :error="error"
                 :small="small"
                 step="0.01"
                 placeholder=""
                 label="Number" />

        <UIInput v-model="password"
                 :loading="loading"
                 name="ui-text8"
                 type="password"
                 clearable
                 :error="error"
                 :small="small"
                 :large="large"
                 label="Password" />

        <UIInput v-model="disabled"
                 :loading="loading"
                 name="ui-text9"
                 label="Disabled"
                 :large="large"
                 :error="error"
                 :small="small"
                 disabled />

        <UIInput v-model="prefixProp"
                 :loading="loading"
                 name="ui-text10"
                 :large="large"
                 :error="error"
                 :small="small"
                 label="Prefix (Using prop)"
                 prefix="Reason:" />

        <UIInput v-model="prefixSlot"
                 :loading="loading"
                 name="ui-text11"
                 :large="large"
                 :error="error"
                 :small="small"
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
                 :loading="loading"
                 name="ui-text12"
                 :large="large"
                 :error="error"
                 :small="small"
                 label="Suffix (Using prop)"
                 suffix="kg" />

        <UIInput v-model="suffixSlot"
                 :loading="loading"
                 name="ui-text13"
                 class="mt-10"
                 :large="large"
                 :error="error"
                 :small="small"
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

        <UIInput v-model="placeholder"
                 :error="error"
                 :small="small"
                 :loading="loading"
                 name="ui-text14"
                 class="mt-10"
                 type="number"
                 placeholder="Placeholder text."
                 label="Placeholder" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getLibrarySettings } from '@/helpers';

export default defineComponent({
    name: 'InputDemo',

    setup() {
        const text = ref('I\'m a input!');
        const disabled = ref('Can\'t touch this!');
        const number = ref(50);
        const url = ref('https://google.com');
        const email = ref('my@email.com');
        const search = ref('Search value');
        const tel = ref('00000000000');
        const clearable = ref('Clearable');
        const password = ref('password123');
        const prefixProp = ref('Because');
        const prefixSlot = ref('Billions');
        const suffixProp = ref('100');
        const suffixSlot = ref('Feather-weight');
        const placeholder = ref<number|null>(null);
        const large = ref(false);
        const small = ref(false);
        const error = ref('');
        const loading = ref(false);

        const clearableByDefault = getLibrarySettings()?.clearableByDefault;
        const isClearable = ref(!(typeof clearableByDefault === 'boolean' ? clearableByDefault : false));

        return {
            url,
            email,
            tel,
            search,
            clearable,
            text,
            isClearable,
            disabled,
            number,
            password,
            prefixProp,
            prefixSlot,
            suffixProp,
            suffixSlot,
            placeholder,
            large,
            error,
            loading,
            small
        };
    }
});
</script>
