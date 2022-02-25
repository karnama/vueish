<template>
    <UISelect v-model="component"
              name="transition"
              option-key="name"
              :options="components"
              class="mb-2" />

    <UIPanel header="Single Element" class="mb-6">
        <div class="flex flex-col justify-center"
             :style="[ component.name !== 'UIExpandTransition' ? 'min-height: 10rem;' : '' ]">
            <component :is="component.name">
                <div v-if="singleElement" class="content" />
            </component>
        </div>

        <slot name="footer">
            <div class="flex justify-end">
                <UIButton :label="`${singleElement ? 'Not' : ''} Visible`"
                          outline
                          @click="singleElement = !singleElement" />
            </div>
        </slot>
    </UIPanel>

    <UIPanel header="Between Two Elements" class="mb-6">
        <div class="flex flex-col justify-center"
             :style="[ component.name !== 'UIExpandTransition' ? 'min-height: 10rem;' : '' ]">
            <component :is="component.name">
                <div v-if="betweenTwoElements" class="content" />
                <div v-else class="content-2" />
            </component>
        </div>

        <slot name="footer">
            <div class="flex justify-end">
                <UIButton label="Toggle"
                          outline
                          @click="betweenTwoElements = !betweenTwoElements" />
            </div>
        </slot>
    </UIPanel>

    <UIPanel header="Group Of Elements" class="mb-6">
        <slot name="actions">
            <div class="flex justify-end">
                <label>
                    Number of elements
                    <input v-model="elementCount"
                           type="range"
                           min="0"
                           max="10">
                </label>
            </div>
        </slot>

        <div class="flex flex-col justify-center"
             :style="[ component.name !== 'UIExpandTransition' ? 'min-height: 10rem;' : '' ]">
            <div class="space-y-2">
                <component :is="component.name" group>
                    <div v-for="(_e, i) in Array.from({ length: elementCount })"
                         :key="i"
                         :class="[i % 2 === 0 ? 'content' : 'content-2']" />
                </component>
            </div>
        </div>
    </UIPanel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'TransitionsDemo',

    setup: () => {
        const components = [
            { name: 'UIFadeTransition' },
            { name: 'UIFadeScaleTransition' },
            { name: 'UIExpandTransition' }
        ];

        const component = ref<{ name: string }>({ name: 'UIFadeTransition' });
        const singleElement = ref(false);
        const betweenTwoElements = ref(true);
        const elementCount = ref(0);

        return {
            singleElement,
            betweenTwoElements,
            elementCount,
            components,
            component
        };
    }
});
</script>

<style scoped lang="scss">
.box {
    @apply h-32 w-32 rounded shadow;
}

.content {
    @extend .box;
    background: rgb(2,0,36);
    background: linear-gradient(21deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 100%);
}

.content-2 {
    @extend .box;
    background: rgb(2,0,36);
    background: linear-gradient(201deg, rgba(2,0,36,1) 0%, rgb(255, 183, 0) 100%);
}
</style>
