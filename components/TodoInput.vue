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
  <div class="todoInput">
    <input v-model="localState" type="text" @keypress.enter="emit('save')">
    <button @click="$emit('save')">Save</button>
  </div>
</template>



<style scoped>

</style>