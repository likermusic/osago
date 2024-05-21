export async function combinePromises<T extends Record<string, Nullable<Promise<unknown>>>>(
  promises: T,
): Promise<Record<keyof T, unknown>> {
  const resultObject = {} as Record<keyof T, unknown>;
  if (!promises) {
    return resultObject;
  }

  const promisesArray = Object.values(promises).map((promise) => promise ?? Promise.resolve(null));

  const results = await Promise.allSettled(promisesArray);

  Object.keys(promises).forEach((key, index) => {
    const promiseValue = results[index];
    resultObject[key as keyof T] = promiseValue.status === 'fulfilled' ? promiseValue.value : null;
  });

  return resultObject as Record<keyof T, unknown>;
}
