<template>
    <h1 class="text-2xl mb-2 text-center">
        UINumber
    </h1>

    <div class="py-10 space-y-10">
        <div class="space-y-10">
            <div>
                <UINumber v-model="input"
                          name="ui-number"
                          label="Standard:"
                          autofocus />
                <small class="mt-3">Output: </small>
                <small>{{ input }}</small>
            </div>

            <UINumber v-model="input2"
                      name="ui-text3"
                      label="Disabled:"
                      disabled />
            <UINumber v-model="input3"
                      name="ui-text3"
                      label="Attribute Prefix:"
                      prefix="£" />
            <UINumber v-model="input3" name="ui-text3" label="Slot Prefix:">
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
            </UINumber>
            <UINumber v-model="input3"
                      name="ui-text3"
                      label="Attribute Suffix:"
                      suffix="kg" />
            <UINumber v-model="input3" name="ui-text3" label="Slot Suffix:">
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
            </UINumber>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UINumber from './UINumber.vue';

export default defineComponent({
    name: 'Number',
    components: { UINumber },
    setup() {
        const input = ref(1234);
        const input2 = 1234;
        const input3 = 1234;

        return { input, input2, input3 };
    }
});
</script>
