<script setup lang="ts">
import cookie from 'js-cookie';

const router = useRouter();

const logout = () => {
  cookie.remove('nuxt3-todo-token');
  router.push('/auth');
};
</script>

<template>
  <header
    class="w-full flex justify-between items-center h-14 px-5 bg-neutral-900 text-white"
  >
    <h1 class="text-2xl font-bold uppercase">Todoer</h1>
    <nav>
      <a
        class="cursor-pointer hover:text-red-400 transition-all duration-300"
        @click="logout"
      >
        Logout
      </a>
    </nav>
  </header>
</template>
