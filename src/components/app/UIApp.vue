<script lang="ts">
import { defineComponent } from 'vue';
import { portalId } from './UIAppExports';

export default defineComponent({
    name: 'UIApp',

    functional: true,

    setup() {
        if (!document.getElementById(portalId)) {
            const portalTarget = document.createElement('div');
            portalTarget.id = portalId;
            document.body.appendChild(portalTarget);
        }
    },

    render() {
        return this.$slots.default();
    }
});
</script>
