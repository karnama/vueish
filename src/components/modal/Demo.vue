<template>
    <UIModal ref="modal"
             header="header"
             @cancel="callback"
             @accept="callback">
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi blanditiis cumque, deserunt enim illo iste
            obcaecati pariatur quam. Aut blanditiis delectus dolores eius hic nesciunt perspiciatis possimus reiciendis
            tenetur voluptatibus!
        </div>
        <div>
            Ab alias aliquam aperiam, beatae blanditiis commodi dolores doloribus exercitationem explicabo facere
            fugiat fugit harum inventore maxime modi nesciunt odio omnis praesentium quam quasi sint soluta tenetur
            ullam voluptas voluptatum.
        </div>
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
        // eslint-disable-next-line no-console
        const callback = () => console.log('called');

        return { callback };
    }
});
</script>
