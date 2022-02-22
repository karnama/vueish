<template>
    <div class="flex justify-evenly mb-6">
        <UIButton category="danger" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <UIRadioGroup v-model="value"
                  name="gender"
                  :error="error"
                  class="mb-10">
        <template #label>
            Vertical
        </template>
        <UIRadio value="male"
                 label="Male" />
        <UIRadio value="female"
                 label="Female" />
        <UIRadio value="other"
                 label="Other" />
    </UIRadioGroup>

    <UIRadioGroup v-model="value2"
                  name="gender2"
                  horizontal
                  :error="error"
                  label="Horizontal/Disabled"
                  disabled>
        <UIRadio value="male"
                 label="Male"
                 :disabled="false" />
        <UIRadio value="female"
                 label="Female" />
        <UIRadio value="other">
            Other
        </UIRadio>
    </UIRadioGroup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'RadioDemo',

    setup() {
        const value = ref();
        const value2 = ref('female');
        const error = ref('');

        return {
            value,
            value2,
            error
        };
    }
});
</script>
