import { tryWrap } from '~/helpers/tryWrap';
import { todos } from '~/src/controllers';

export default defineEventHandler(async (event) => {
  const { result, error } = await tryWrap(async () => {
    const ownerid = event.context.user?.id;
    if (!ownerid) {
      throw new Error('Need log in first');
    }
    const { title, id, done } = await readBody(event);
    const newTodo = await todos.editTodo({ title, ownerid, id, done });
    return newTodo;
  });

  return { result, error: (error?.message as string) || null };
});
