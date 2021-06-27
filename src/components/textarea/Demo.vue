<template>
    <div class="py-10 space-y-10">
        <div class="space-y-10">
            <UITextarea v-model="customText"
                        placeholder="Write your bio here"
                        name="ui-text"
                        counter
                        clearable
                        auto-size
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

export default defineComponent({
    // eslint-disable-next-line vue/no-reserved-component-names
    name: 'Textarea',

    setup() {
        const text = ref('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cum dignissimos eius ' +
            'nihil nulla quia similique tempore temporibus voluptatum? Commodi est et itaque maxime molestiae ' +
            'nesciunt omnis reprehenderit tempore? Repudiandae?');
        const customText = ref('');
        const disabled = ref('Can\'t touch this!');

        return {
            text,
            disabled,
            customText
        };
    }
});
</script>
