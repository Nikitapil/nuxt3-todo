import { todos } from '~/src/controllers';
import { tryWrap } from '~/helpers/tryWrap';

export default defineEventHandler(async (event) => {
  const { result, error } = await tryWrap(async () => {
    const ownerid = event.context.user?.id;
    if (!ownerid) {
      throw new Error('Need log in first');
    }
    const { page, limit, isDone, search } = await readBody(event);

    const todoList = await todos.getTodoList({
      page,
      limit,
      isDone,
      search,
      ownerid
    });
    return todoList;
  });

  return { result, error: (error?.message as string) || null };
});
