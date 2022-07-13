<template>
    <div class="flex justify-evenly mb-6">
        <UICheckbox v-model="large"
                    name="large"
                    label="Large Style" />
        <UICheckbox v-model="small"
                    name="small"
                    label="Small Style" />
        <UICheckbox v-model="loading"
                    name="loading"
                    label="Loading" />

        <UIButton theme="red" @click="error ? error = '' : error = 'Error message.'">
            {{ error ? 'Remove' : 'Set' }} Error state
        </UIButton>
    </div>

    <div class="py-10 space-y-10">
        <div class="space-y-10">
            <UITextarea v-model="customText"
                        placeholder="Write your bio here"
                        :loading="loading"
                        name="ui-text"
                        counter
                        :large="large"
                        :small="small"
                        :error="error"
                        clearable
                        auto-size
                        label="Auto sizing" />

            <UITextarea v-model="customText"
                        placeholder="Write your bio here"
                        :loading="loading"
                        name="ui-text"
                        counter
                        :large="large"
                        :small="small"
                        :error="error"
                        clearable
                        label="Resizable" />

            <UITextarea v-model="text"
                        :loading="loading"
                        name="ui-text"
                        rows="2"
                        :large="large"
                        :small="small"
                        :error="error"
                        label="Fixed Height"
                        fixed />

            <UITextarea v-model="disabled"
                        :loading="loading"
                        name="ui-text3"
                        label="Disabled"
                        :large="large"
                        :small="small"
                        :error="error"
                        rows="1"
                        disabled />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'TextareaDemo',

    setup() {
        const text = ref('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cum dignissimos eius ' +
            'nihil nulla quia similique tempore temporibus voluptatum? Commodi est et itaque maxime molestiae ' +
            'nesciunt omnis reprehenderit tempore? Repudiandae?');
        const customText = ref('dgs');
        const disabled = ref('Can\'t touch this!');
        const error = ref('');
        const large = ref(false);
        const loading = ref(false);
        const small = ref(false);

        return {
            text,
            disabled,
            customText,
            error,
            large,
            loading,
            small
        };
    }
});
</script>
