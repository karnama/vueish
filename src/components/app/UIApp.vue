<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UIApp',
    // todo - aria live region
    render() {
        // todo - remove if not needed
        return this.$slots?.default instanceof Function ? this.$slots.default() : '';
    }
});
</script>
