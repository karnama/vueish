<template>
    <main class="h-full container mx-auto bg-gray-50 h-full themed light p-10 text-center">
        <h1>Vueish Demo</h1>
        <div class="py-10 space-y-10">
            <div class="space-x-2">
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
                <h1 class="text-2xl mb-2">
                    Disabled
                </h1>
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
    </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UIButton from './components/button/UIButton.vue';

export default defineComponent({
    name: 'Demo',
    components: { UIButton },
    setup() {
        const buttonType = ref('');

        return { buttonType };
    }
});
</script>
