<template>
    <div class="flex justify-evenly mb-6">
        <UIButton category="danger" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <div class="py-10 space-y-10">
        <div class="space-y-10">
            <UITextarea v-model="customText"
                        placeholder="Write your bio here"
                        name="ui-text"
                        counter
                        :error="error"
                        clearable
                        auto-size
                        label="Standard" />

            <UITextarea v-model="text"
                        name="ui-text"
                        rows="2"
                        :error="error"
                        label="Fixed Height"
                        fixed />

            <UITextarea v-model="disabled"
                        name="ui-text3"
                        label="Disabled"
                        :error="error"
                        rows="1"
                        disabled />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UITextarea from './UITextarea.vue';
import UIButton from '@components/button/UIButton.vue';

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Textarea',

    components: { UITextarea, UIButton },

    setup() {
        const text = ref('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cum dignissimos eius ' +
            'nihil nulla quia similique tempore temporibus voluptatum? Commodi est et itaque maxime molestiae ' +
            'nesciunt omnis reprehenderit tempore? Repudiandae?');
        const customText = ref('dgs');
        const disabled = ref('Can\'t touch this!');
        const error = ref('');

        return {
            text,
            disabled,
            customText,
            error
        };
    }
});
</script>
