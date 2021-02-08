<template>
    <i v-if="icons[type]" :class="icons[type]" />
    <template v-else v-html="require(src)" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getLibrarySettings } from '@/helpers';
import { Icon } from '@/main';

export default defineComponent({
    name: 'UIIcon',

    props: {
        type: {
            type: String as () => Icon,
            required: true
        }
    },

    setup(props) {
        const icons = getLibrarySettings()?.icons;
        const src = computed(() => icons[props.type] ? '' : require(`./${props.type}.svg`));

        return {
            icons,
            src
        };
    }
});
</script>
