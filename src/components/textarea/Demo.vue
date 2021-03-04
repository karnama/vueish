<template>
    <h1 class="text-2xl mb-2 text-center">
        UITextarea
    </h1>

    <div class="py-10 space-y-10">
        <div class="space-y-10">
            <UITextarea placeholder="Write your bio here"
                        name="ui-text"
                        clearable
                        label="Standard" />

            <UITextarea v-model="text"
                        name="ui-text"
                        rows="2"
                        label="Fixed Height"
                        fixed />

            <UITextarea v-model="disabled"
                        name="ui-text3"
                        label="Disabled"
                        rows="1"
                        disabled />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UITextarea from './UITextarea.vue';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Textarea',

    components: { UITextarea },

    setup() {
        const text = ref('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda at ' +
            'atque consequatur consequuntur culpa deleniti, doloribusdaaseeeff eligendi excepturi expedita fugit id ' +
            'incidunt laborum neque nulla quos reprehenderit sit tempora.');
        const disabled = ref('Can\'t touch this!');

        return {
            text,
            disabled
        };
    }
});
</script>
