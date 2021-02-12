<template>
    <h1 class="text-2xl mb-2 text-center">
        UIRadio
    </h1>

    <UIRadioGroup v-model="value"
                  name="gender"
                  required
                  label="Vertical/Required">
        <UIRadio value="male"
                 label="Male" />
        <UIRadio value="female"
                 label="Female" />
        <UIRadio value="other"
                 label="Other" />
    </UIRadioGroup>

    <div class="flex items-center">
        <UIRadioGroup v-model="value"
                      name="gender"
                      required
                      label="Vertical/Required">
            <UIRadio value="male"
                     label="Male" />
            <UIRadio value="female"
                     label="Female" />
            <UIRadio value="other"
                     label="Other" />
        </UIRadioGroup>

        <div class="flex-col space-y-6">
            <UIRadioGroup v-model="value2"
                          name="gender2"
                          class="ml-10"
                          horizontal>
                <template #label>
                    Horizontal
                </template>
                <UIRadio value="male"
                         label="Male" />
                <UIRadio value="female"
                         label="Female" />
                <UIRadio value="other"
                         label="Other" />
            </UIRadioGroup>

            <UIRadioGroup v-model="value2"
                          name="gender3"
                          class="ml-10"
                          horizontal
                          disabled>
                <template #label>
                    Horizontal/Disabled
                </template>
                <UIRadio value="male"
                         label="Male"
                         :disabled="false" />
                <UIRadio value="female"
                         label="Female" />
                <UIRadio value="other">
                    Other
                </UIRadio>
            </UIRadioGroup>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIRadio from './UIRadio.vue';
import UIRadioGroup from './UIRadioGroup.vue';

export default defineComponent({
    name: 'Radio',

    components: { UIRadioGroup, UIRadio },

    setup() {
        const value = ref(null);
        const value2 = ref('male');

        return { value, value2 };
    }
});
</script>
