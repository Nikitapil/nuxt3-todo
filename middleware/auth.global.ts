const AUTH_ROUTE = '/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const cookie = useCookie('nuxt3-todo-token');

  if (!cookie || !cookie.value) {
    if (to.fullPath !== AUTH_ROUTE) {
      return navigateTo('/auth');
    }
  } else if (to.fullPath === AUTH_ROUTE) {
    return navigateTo('/');
  }
});
