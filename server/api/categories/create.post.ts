import { tryWrap } from '~/helpers/tryWrap';
import { categories } from '~/src/controllers';

export default defineEventHandler(async (event) => {
  const { result, error } = await tryWrap(async () => {
    const ownerid = event.context.user?.id;
    if (!ownerid) {
      throw new Error('Need log in first');
    }
    const { name } = await readBody(event);

    const newCategory = await categories.createCategory({ name, ownerid });
    return newCategory;
  });

  return { result, error: (error?.message as string) || null };
});
