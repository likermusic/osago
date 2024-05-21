const checkIsStorageSupported = (storage: Storage | null) => {
  if (!storage) return false;
  try {
    const key = 'test_storage_key';
    storage.setItem(key, key);
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const customStorage = (storage: Storage | null) => ({
  get(key: string) {
    if (checkIsStorageSupported(storage) && storage) {
      return storage.getItem(key);
    }
    return null;
  },
  remove(key: string) {
    if (checkIsStorageSupported(storage) && storage) {
      storage.removeItem(key);
    }
  },
  set(key: string, value: string) {
    if (checkIsStorageSupported(storage) && storage) {
      storage.setItem(key, value);
    }
  },
});

const sessionStorageIfExist = typeof sessionStorage !== 'undefined' ? sessionStorage : null;
const localStorageIfExist = typeof localStorage !== 'undefined' ? localStorage : null;

export const customSessionStorage = customStorage(sessionStorageIfExist);
export const customLocalStorage = customStorage(localStorageIfExist);
