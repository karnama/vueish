<template>
    <h1 class="text-2xl mb-2 text-center">
        UIText
    </h1>

    <div class="py-10 space-y-10">
        <div class="space-y-10">
            <div>
                <UIText v-model="text"
                        name="ui-text"
                        label="Standard"
                        no-clear />
                <small class="mt-3">Output: </small>
                <small>{{ text }}</small>
            </div>

            <UIText v-model="number"
                    name="ui-text4"
                    type="number"
                    autofocus
                    label="Number" />

            <UIText v-model="password"
                    name="ui-text9"
                    type="password"
                    label="Password" />

            <UIText v-model="disabled"
                    name="ui-text3"
                    label="Disabled"
                    disabled />

            <UIText v-model="prefixProp"
                    name="ui-text5"
                    label="Prefix (Using prop)"
                    prefix="Reason:" />

            <UIText v-model="prefixSlot"
                    name="ui-text6"
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
            </UIText>

            <UIText v-model="suffixProp"
                    name="ui-text6"
                    label="Suffix (Using prop)"
                    suffix="kg" />

            <UIText v-model="suffixSlot"
                    name="ui-text7"
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
            </UIText>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIText from './UIText.vue';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Text',
    components: { UIText },
    setup() {
        const text = ref('I\'m a text input!');
        const disabled = ref('Can\'t touch this!');
        const number = ref(123);
        const password = ref('password123');
        const prefixProp = ref('Because');
        const prefixSlot = ref('Billions');
        const suffixProp = ref('100');
        const suffixSlot = ref('Feather-weight');

        return {
            text,
            disabled,
            number,
            password,
            prefixProp,
            prefixSlot,
            suffixProp,
            suffixSlot
        };
    }
});
</script>
