import { tryWrap } from '~/helpers/tryWrap';

import { categories } from '~/src/controllers';

export default defineEventHandler(async (event) => {
  const { result, error } = await tryWrap(async () => {
    const ownerid = event.context.user?.id;
    if (!ownerid) {
      throw new Error('Need log in first');
    }

    const categoriesList = await categories.getCategories(ownerid);
    return categoriesList;
  });

  return { result, error: (error?.message as string) || null };
});
