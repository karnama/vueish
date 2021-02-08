<template>
    <h1 class="text-2xl mb-2 text-center">
        UIAlert
    </h1>
    <div class="py-10 space-y-10 flex flex-col items-center justify-center">
        <div class="flex space-x-5">
            <UIAlert v-model="standard" title="Default">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae corporis, delectus ea et
                itaque minima, quia quibusdam sed, sint ullam voluptatibus! Ab aliquid architecto atque impedit iure
                quam quidem?
            </UIAlert>

            <UIAlert v-model="primary" type="primary" title="Primary">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae corporis, delectus ea et
                itaque minima, quia quibusdam sed, sint ullam voluptatibus! Ab aliquid architecto atque impedit iure
                quam quidem?
            </UIAlert>
        </div>
        <div class="flex space-x-5">
            <UIAlert v-model="info" type="info" title="Info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae corporis, delectus ea et
                itaque minima, quia quibusdam sed, sint ullam voluptatibus! Ab aliquid architecto atque impedit iure
                quam quidem?
            </UIAlert>

            <UIAlert v-model="success" type="success" title="Success">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae corporis, delectus ea et
                itaque minima, quia quibusdam sed, sint ullam voluptatibus! Ab aliquid architecto atque impedit iure
                quam quidem?
            </UIAlert>
        </div>
        <div class="flex space-x-5">
            <UIAlert v-model="warning" type="warning" title="Warning">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae corporis, delectus ea et
                itaque minima, quia quibusdam sed, sint ullam voluptatibus! Ab aliquid architecto atque impedit iure
                quam quidem?
            </UIAlert>

            <UIAlert v-model="danger" type="danger" title="Danger">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae corporis, delectus ea et
                itaque minima, quia quibusdam sed, sint ullam voluptatibus! Ab aliquid architecto atque impedit iure
                quam quidem?
            </UIAlert>
        </div>

        <div class="text-center">
            <UIButton v-if="showReset" type="primary" @click="reset">
                Reset
            </UIButton>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import UIAlert from './UIAlert.vue';
import UIButton from '@components/button/UIButton.vue';

export default defineComponent({
    name: 'Alert',

    components: { UIButton, UIAlert },

    setup() {
        const state = {
            standard: ref(true),
            primary: ref(true),
            success: ref(true),
            info: ref(true),
            warning: ref(true),
            danger: ref(true)
        };

        const showReset = computed(() => Object.values(state).some(state => !state.value));


        const reset = () => Object.values(state).forEach(state => state.value = true);

        return { reset, ...state, showReset };
    }
});
</script>
