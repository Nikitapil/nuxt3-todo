<script setup lang="ts">
const router = useRouter();

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const loginMode = ref(true);

const login = async () => {
  const url = '/api/users/login';

  const { error: err } = await $fetch(url, {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value
    }
  });

  if (err) {
    error.value = err;
    return;
  }

  await router.push('/');
};

const register = async () => {
  error.value = null;
  const url = '/api/users/create';

  const { error: err } = await $fetch(url, {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value
    }
  });

  if (err) {
    error.value = err;
    return;
  }

  loginMode.value = true;
  password.value = '';
  passwordConfirm.value = '';
};

const authorize = () => {
  if (loginMode.value) {
    login();
    return;
  }
  register();
};
</script>

<template>
  <main class="min-h-screen pt-18 bg-gray-100">
    <section class="text-center py-10">
      <h1 class="text-5xl font-bold text-gray-700 mb-4">
        {{ loginMode ? 'Login to your account' : 'Create an account' }}
      </h1>
      <form
        class="flex flex-col max-w-lg mx-auto"
        @submit.prevent
      >
        <input
          id="email"
          v-model="email"
          class="px-2 py-3 mt-3 border-1 border-lime-200"
          placeholder="Email Address"
          type="email"
          name="email"
        />
        <input
          id="password"
          v-model="password"
          class="px-2 py-3 mt-3 border-1 border-lime-200"
          placeholder="Password"
          type="password"
          name="password"
        />

        <input
          v-if="!loginMode"
          id="password-confirm"
          v-model="passwordConfirm"
          class="px-2 py-3 mt-3 border-1 border-lime-200"
          placeholder="Re-enter your password"
          type="password"
          name="password-confirm"
        />

        <button
          class="p-5 bg-blue-500 text-white rounded-sm mt-5 disabled:bg-gray-400 disabled:text-white"
          :disabled="loading"
          @click="authorize"
        >
          Authorize
        </button>

        <p
          v-if="error"
          class="text-red-400 mt-3"
        >
          {{ error }}
        </p>
        <a
          class="mt-3 underline cursor-pointer"
          @click="loginMode = !loginMode"
        >
          Or
          {{ loginMode ? 'Register' : 'Login' }}
          instead
        </a>
      </form>
    </section>
  </main>
</template>
<style>
main {
  color: #060f2f;
}
</style>
