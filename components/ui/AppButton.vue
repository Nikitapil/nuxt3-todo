<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    text?: string;
    appearance?: 'primary' | 'transparent' | 'danger';
  }>(),
  {
    appearance: 'primary',
    disabled: false
  }
);

const classes = computed(() => {
  const classesList = [
    'p-3',
    'text-white rounded-md',
    'disabled:bg-gray-400',
    'disabled:text-white',
    'hover:opacity-80',
    'transition-all duration-300'
  ];
  switch (props.appearance) {
    case 'primary':
      classesList.push('bg-blue-500');
      break;
    case 'transparent':
      classesList.push('bg-transparent');
      break;
    case 'danger':
      classesList.push('bg-red-500');
      break;
    default:
      classesList.push('bg-blue-500');
  }
  return classesList.join(' ');
});
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
  >
    <slot>{{ text }}</slot>
  </button>
</template>
