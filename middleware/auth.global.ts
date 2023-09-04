const ALLOWED = [/^\/auth\/?$/];

export default defineNuxtRouteMiddleware(async (to) => {
  if (ALLOWED.some((route) => route.test(to.fullPath))) {
    return;
  }

  const cookie = useCookie('nuxt3-todo-token');

  if (!cookie || !cookie.value) {
    return navigateTo('/auth');
  }
});
