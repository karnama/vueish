<template>
    <UIModal ref="modal" :loading="loading" :blocking-loader="blockingLoader">
        <template #header>
            <h2 class="font-bold text-lg">
                My Header
            </h2>
        </template>

        <template #actions>
            <UICheckbox v-model="loading" name="loading" label="Loading" />
        </template>

        <div v-for="(text, index) in paragraphs" :key="index" v-text="text" />
        <template #footer="slotProps">
            <div class="flex flex-wrap justify-between w-full">
                <div class="flex justify-between space-x-1 mr-3">
                    <UIButton @click="paragraphs.push(paragraph)">
                        Add Paragraph
                    </UIButton>
                    <UIButton @click="paragraphs.pop()">
                        Remove Paragraph
                    </UIButton>
                </div>

                <UIButton class="ui-modal-close ml-auto mr-2" @click="slotProps.close">
                    Close
                </UIButton>
                <UIButton theme="blue" class="ui-modal-accept" @click="slotProps.close('accept')">
                    OK
                </UIButton>
            </div>
        </template>
    </UIModal>
    <UIButton @click="$refs.modal.open()">
        Open Modal
    </UIButton>
    <UICheckbox v-model="loading" name="loading" label="Loading" />
    <UICheckbox v-model="blockingLoader" name="loading" label="Use blocking loader" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ModalDemo',

    setup: () => {
        const paragraph = 'Accusamus aperiam corporis culpa cumque cupiditate debitis error et inventore' +
            'libero molestias necessitatibus nisi, odio pariatur, quaerat quam quia quis recusandae repellat' +
            'repudiandae saepe temporibus ullam unde vitae voluptatem, voluptates?';
        const paragraphs = ref<string[]>([paragraph, paragraph, paragraph]);
        const loading = ref(false);
        const blockingLoader = ref(false);

        return {
            paragraph,
            paragraphs,
            loading,
            blockingLoader
        };
    }
});
</script>
