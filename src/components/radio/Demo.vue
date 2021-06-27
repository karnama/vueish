<template>
    <UIRadioGroup v-model="value"
                  name="gender"
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
    name: 'Radio',

    setup() {
        const value = ref();
        const value2 = ref('female');

        return { value, value2 };
    }
});
</script>
