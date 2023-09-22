<script setup lang="ts">
import PageHeading from '~/components/ui/PageHeading.vue';
import AppInput from '~/components/ui/AppInput.vue';
import AppButton from '~/components/ui/AppButton.vue';
import { EApiRoutes } from '~/server/api/constants';

definePageMeta({
  layout: 'empty'
});

const router = useRouter();

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const loginMode = ref(true);

const login = async () => {
  error.value = null;
  const { error: err } = await $fetch(EApiRoutes.LOGIN, {
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
  const { error: err } = await $fetch(EApiRoutes.CREATE_USER, {
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

  await router.push('/');
};

const authorize = async () => {
  loading.value = true;
  if (loginMode.value) {
    await login();
    loading.value = false;
    return;
  }
  await register();
  loading.value = false;
};

const pageTitle = computed(() =>
  loginMode.value ? 'Login to your account' : 'Create an account'
);

const authLinkText = computed(() => (loginMode.value ? 'Register' : 'Login'));
</script>

<template>
  <section class="text-center py-10">
    <PageHeading :text="pageTitle" />
    <form
      class="flex flex-col max-w-lg mx-auto"
      @submit.prevent
    >
      <AppInput
        id="email"
        v-model="email"
        class="mb-3"
        name="email"
        placeholder="Email Address"
        type="email"
        :disabled="loading"
      />

      <AppInput
        id="password"
        v-model="password"
        name="password"
        placeholder="Password"
        type="password"
        :disabled="loading"
      />

      <AppInput
        v-if="!loginMode"
        id="password-confirm"
        v-model="passwordConfirm"
        class="mt-3"
        name="password-confirm"
        placeholder="Re-enter your password"
        type="password"
        :disabled="loading"
      />

      <AppButton
        class="mt-3"
        :disabled="loading"
        text="Authorize"
        @click="authorize"
      />

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
        {{ authLinkText }}
        instead
      </a>
    </form>
  </section>
</template>
