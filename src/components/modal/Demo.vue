<template>
    <UIModal ref="modal">
        <template #header>
            <h2 class="font-bold text-lg">
                My Header
            </h2>
        </template>
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
        <template #footer="slotProps">
            <UIButton class="ui-modal-close ml-auto mr-2" @click="slotProps.close">
                Close
            </UIButton>
            <UIButton category="primary" class="ui-modal-accept" @click="slotProps.close('accept')">
                OK
            </UIButton>
        </template>
    </UIModal>
    <UIButton @click="$refs.modal.open()">
        Open Modal
    </UIButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Modal'
});
</script>
