<template>
    <h1 class="text-2xl mb-2 text-center">
        UITextarea
    </h1>
    <UICheckbox v-model="large"
                name="large"
                label="Large Style"
                class="mb-6" />

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
import UICheckbox from '@components/checkbox/UICheckbox.vue';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Textarea',

    components: { UICheckbox, UITextarea },

    setup() {
        const text = ref('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cum dignissimos eius ' +
            'nihil nulla quia similique tempore temporibus voluptatum? Commodi est et itaque maxime molestiae ' +
            'nesciunt omnis reprehenderit tempore? Repudiandae?');
        const disabled = ref('Can\'t touch this!');
        const large = ref(false);

        return {
            text,
            disabled,
            large
        };
    }
});
</script>
