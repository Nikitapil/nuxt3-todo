export const tryWrap = async <T>(promiseCb: () => Promise<T>) => {
  try {
    const result = await promiseCb();
    return { result, error: null };
  } catch (e: any) {
    return { result: null, error: e };
  }
};
