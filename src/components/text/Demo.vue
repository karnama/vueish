<template>
    <h1 class="text-2xl mb-2 text-center">
        UIText
    </h1>

    <div class="py-10 space-y-10">
        <div class="space-y-10">
            <div>
                <h2 class="text-xl mb-2">
                    Standard
                </h2>

                <UIText v-model="value" name="ui-text" autofocus/>

                <small class="mt-3">Output: </small>
                <small>{{ value }}</small>
            </div>

            <div>
                <h2 class="text-xl mb-2">
                    Disabled
                </h2>

                <UIText v-model="value2" name="ui-text" disabled/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIText from './UIText.vue';

export default defineComponent({
    name: 'Text',
    components: { UIText },
    setup() {
        const value = ref('I\'m a text input!');
        const value2 = ref('Disabled :(');

        return { value, value2 };
    }
});
</script>
