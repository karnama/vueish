<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UIApp',

    render() {
        return this.$slots?.default instanceof Function ? this.$slots.default() : '';
    }
});
</script>
