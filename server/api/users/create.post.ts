import { tryWrap } from '~/helpers/tryWrap';
import { users } from '~/src/controllers';

export default defineEventHandler(async (event) => {
  // Example of redirect
  // if (event.context.user === undefined) {
  //     return sendRedirect(event, '/auth')
  // }

  const { result, error } = await tryWrap(async () => {
    const { email, password, passwordConfirm } = await readBody(event);

    const user = await users.add({ email, password, passwordConfirm });

    return user;
  });

  return { result, error: (error?.message as string) || null };
});
