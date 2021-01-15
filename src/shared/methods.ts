export const createTransaction = (storeNames: string, mode: 'readwrite' | 'readonly') => {
  return window.db.transaction(storeNames, mode).objectStore(storeNames);
};
