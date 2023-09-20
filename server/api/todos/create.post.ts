import { todos } from '~/src/controllers';
import { tryWrap } from '~/helpers/tryWrap';

export default defineEventHandler(async (event) => {
  const {result, error} = await tryWrap(async () => {
    const ownerid = event.context.user?.id;
    if (!ownerid) {
      throw new Error('Need log in first');
    }
    const { title } = await readBody(event);

    const newTodo = todos.create({ title, ownerid });
    return newTodo;
  });
});
