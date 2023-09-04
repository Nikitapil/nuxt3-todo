import { EApiRoutes } from '~/server/api/constants';

const AUTH_ROUTE = '/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const user = await $fetch(EApiRoutes.VERIFY);

  if (process.server) {
    return;
  }

  if (!user) {
    if (to.fullPath !== AUTH_ROUTE) {
      return navigateTo('/auth');
    }
  } else if (to.fullPath === AUTH_ROUTE) {
    return navigateTo('/');
  }
});
