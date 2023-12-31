import { todos } from '~/src/controllers';
import { tryWrap } from '~/helpers/tryWrap';

export default defineEventHandler(async (event) => {
  const { result, error } = await tryWrap(async () => {
    const ownerid = event.context.user?.id;
    if (!ownerid) {
      throw new Error('Need log in first');
    }
    const { title, category } = await readBody(event);

    const newTodo = await todos.create({ title, category, ownerid });
    return newTodo;
  });

  return { result, error: (error?.message as string) || null };
});
