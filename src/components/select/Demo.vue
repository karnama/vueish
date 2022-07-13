<template>
    <div class="flex justify-evenly flex-wrap mb-6">
        <UICheckbox v-model="large"
                    name="large"
                    label="Large Style" />
        <UICheckbox v-model="small"
                    name="small"
                    label="Small Style" />
        <UICheckbox v-model="loading"
                    name="loading"
                    label="Loading" />
        <UICheckbox v-model="clearable"
                    name="clearable"
                    label="Clearable" />

        <UIButton theme="red" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>
    <div class="space-y-10">
        <UISelect v-model="selected"
                  :options="options"
                  :clearable="clearable"
                  :error="error"
                  :large="large"
                  :small="small"
                  label="Single select"
                  :loading="loading"
                  name="select-1" />
        <span class="text-sm text-gray-400">
            Bound: {{ selected }}
        </span>

        <UISelect v-model="multiSelected"
                  multi
                  :options="options"
                  :error="error"
                  :clearable="clearable"
                  disabled
                  :large="large"
                  :small="small"
                  label="Disabled multi select"
                  :loading="loading"
                  name="select-2" />
        <span class="text-sm text-gray-400">
            Bound: {{ multiSelected }}
        </span>

        <UISelect v-model="multiSelected"
                  multi
                  :options="options"
                  :clearable="clearable"
                  label="Multi select"
                  :error="error"
                  :large="large"
                  :small="small"
                  :loading="loading"
                  name="select-2" />
        <span class="text-sm text-gray-400">
            Bound: {{ multiSelected }}
        </span>

        <UISelect v-model="selectedSimple"
                  :options="['Foo', 'Bar', 'Baz']"
                  :clearable="clearable"
                  :large="large"
                  :small="small"
                  label="Array of strings as select"
                  :loading="loading"
                  name="select-4" />
        <span class="text-sm text-gray-400">
            Bound: {{ selectedSimple }}
        </span>

        <UISelect v-model="multiSelectedSimple"
                  :options="['Foo', 'Bar', 'Baz']"
                  multi
                  :clearable="clearable"
                  :large="large"
                  :small="small"
                  label="Array of strings as multi select"
                  :loading="loading"
                  name="select-4" />
        <span class="text-sm text-gray-400">
            Bound: {{ multiSelectedSimple }}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const options = [
    {
        id: 1,
        name: 'Bruce Banner'
    },
    {
        id: 2,
        name: 'Bruce Wayne'
    },
    {
        id: 3,
        name: 'Bruce Lee'
    },
    {
        id: 4,
        name: 'Brucie Bonus'
    },
    {
        id: 5,
        name: 'Bruce Nolan'
    },
    {
        id: 6,
        name: 'Bruce Norris'
    },
    {
        id: 7,
        name: 'Bruce Baxter'
    }
];

export default defineComponent({
    name: 'SelectDemo',

    setup() {
        const selected = ref(null);
        const multiSelected = ref(null);
        const selectedSimple = ref('Foo');
        const multiSelectedSimple = ref(['Foo', 'Bar']);
        const large = ref(false);
        const small = ref(false);
        const error = ref('');
        const loading = ref(false);
        const clearable = ref(false);

        return {
            selected,
            multiSelected,
            selectedSimple,
            multiSelectedSimple,
            options,
            large,
            error,
            loading,
            clearable,
            small
        };
    }
});
</script>
