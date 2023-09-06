import { tryWrap } from '~/helpers/tryWrap';
import { users } from '~/src/controllers';

export default defineEventHandler(async (event) => {
  // TODO delete comment bellow
  // Example of redirect
  // if (event.context.user === undefined) {
  //     return sendRedirect(event, '/auth')
  // }

  const { result, error } = await tryWrap(async () => {
    const { email, password, passwordConfirm } = await readBody(event);

    const credentials = await users.add({ email, password, passwordConfirm });

    setCookie(event, 'nuxt3-todo-token', credentials?.token || '', {
      expires: new Date(
        Date.now() + (credentials?.expiryInDays || 0) * 24 * 60 * 60 * 1000
      )
    });

    return 'success';
  });

  return { result, error: (error?.message as string) || null };
});
