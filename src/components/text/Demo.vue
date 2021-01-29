<template>
    <h1 class="text-2xl mb-2 text-center">
        UIText
    </h1>

    <div class="py-10 space-y-10">
        <div class="space-y-10">
            <div>
                <UIText v-model="input"
                        name="ui-text"
                        label="Standard"
                        autofocus />
                <small class="mt-3">Output: </small>
                <small>{{ input }}</small>
            </div>

            <UIText v-model="input2"
                    name="ui-text2"
                    label="Custom placeholder"
                    placeholder="Type here..." />
            <UIText v-model="input3"
                    name="ui-text3"
                    label="Disabled"
                    disabled />
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
        const input = ref('I\'m a text input!');
        const input2 = ref('');
        const input3 = 'Can\'t change this';

        return { input, input2, input3 };
    }
});
</script>
