<template>
    <div class="flex justify-evenly w-full mb-4">
        <UICheckbox v-model="loading" name="loading" label="Loading" />
        <UICheckbox v-model="blockingLoader" name="loading" label="Use blocking loader" />
    </div>

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
    <UIModal ref="confirmModal" body="Are you sure you want to delete?" header="Confirm Delete." />

    <div class="flex justify-evenly w-full">
        <UIButton @click="$refs.modal.open()">
            Open Modal
        </UIButton>
        <UIButton theme="red" outline @click="getConfirm">
            Delete
        </UIButton>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { UIModal } from 'types';

export default defineComponent({
    name: 'ModalDemo',

    setup: () => {
        const paragraph = 'Accusamus aperiam corporis culpa cumque cupiditate debitis error et inventore' +
            'libero molestias necessitatibus nisi, odio pariatur, quaerat quam quia quis recusandae repellat' +
            'repudiandae saepe temporibus ullam unde vitae voluptatem, voluptates?';
        const paragraphs = ref<string[]>([paragraph, paragraph, paragraph]);
        const loading = ref(false);
        const blockingLoader = ref(false);
        const confirmModal = ref<UIModal>();
        const getConfirm = async () => {
            const response = await confirmModal.value!.confirm();
            alert('response was ' + String(response));
        };

        return {
            paragraph,
            paragraphs,
            loading,
            blockingLoader,
            confirmModal,
            getConfirm
        };
    }
});
</script>
