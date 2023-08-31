<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  error: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'save'): void;
}>()

const localState = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="w-18/12 sm:w-8/12 max-w-lg mx-auto h-24 bg-white rounded-md shadow-sm py-5 px-10 flex items-center justify-between mb-5 border-red-300">
    <input
        v-model="localState"
        type="text"
        placeholder="Create a todo"
        class="border py-2 px-3"
        :class="{'border-red-300': error, 'border-gray-300': !error}"
        @keypress.enter="emit('save')"
    >
    <button @click="$emit('save')">Save</button>
  </div>
</template>



<style scoped>

</style>