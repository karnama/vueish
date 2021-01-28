<template>
    <h1 class="text-2xl mb-2 text-center">
        UIButton
    </h1>
    <div class="py-10 space-y-10">
        <div class="space-x-2">
            <h2 class="text-xl mb-2">
                Standard
            </h2>
            <UIButton @click="buttonType = 'default'">
                Default
            </UIButton>
            <UIButton type="primary" class="bg-opacity-50" @click="buttonType = 'primary'">
                Primary
            </UIButton>
            <UIButton type="info" @click="buttonType = 'info'">
                Info
            </UIButton>
            <UIButton type="success" @click="buttonType = 'success'">
                Success
            </UIButton>
            <UIButton type="warning" @click="buttonType = 'warning'">
                Warning
            </UIButton>
            <UIButton type="danger" @click="buttonType = 'danger'">
                Danger
            </UIButton>
            <UIButton type="brand" @click="buttonType = 'brand'">
                Brand
            </UIButton>
            <p v-if="buttonType" class="mt-2">
                Clicked {{ buttonType }}!
            </p>
        </div>

        <div class="space-x-2">
            <h2 class="text-xl mb-2">
                Disabled
            </h2>
            <UIButton disabled @click="buttonType = 'default'">
                Default
            </UIButton>
            <UIButton type="primary" disabled @click="buttonType = 'primary'">
                Primary
            </UIButton>
            <UIButton type="info" disabled @click="buttonType = 'info'">
                Info
            </UIButton>
            <UIButton type="success" disabled @click="buttonType = 'success'">
                Success
            </UIButton>
            <UIButton type="warning" disabled @click="buttonType = 'warning'">
                Warning
            </UIButton>
            <UIButton type="danger" disabled @click="buttonType = 'danger'">
                Danger
            </UIButton>
            <UIButton type="brand" disabled @click="buttonType = 'brand'">
                Brand
            </UIButton>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIButton from './UIButton.vue';

export default defineComponent({
    name: 'Button',
    components: { UIButton },
    setup() {
        const buttonType = ref('');

        return { buttonType };
    }
});
</script>
