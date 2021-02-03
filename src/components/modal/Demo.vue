<template>
    <UIModal ref="modal" header="header" @cancel="callback" @accept="callback">
        lorem*
    </UIModal>
    <UIButton @click="$refs.modal.open()">
        Open Modal
    </UIButton>
</template>

<script lang="ts">
import UIButton from '@components/button/UIButton.vue';
import { defineComponent } from 'vue';
import UIModal from '@components/modal/UIModal.vue';

export default defineComponent({
    name: 'Modal',

    components: {
        UIModal,
        UIButton
    },

    setup() {
        const callback = () => console.log('called');

        return { callback };
    }
});
</script>
