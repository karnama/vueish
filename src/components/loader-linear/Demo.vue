<template>
    <UILinearLoader />
</template>

<script lang="ts">
import UILinearLoader from './UILinearLoader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LinearLoader',
    components: { UILinearLoader }
});
</script>
