<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UIApp',

    render() {
        // todo - remove if not needed
        return this.$slots?.default instanceof Function ? this.$slots.default() : '';
    }
});
</script>
