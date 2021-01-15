export const createTransaction = (storeNames: 'Item' | 'Category', mode: 'readwrite' | 'readonly') => {
  return window.db.transaction(storeNames, mode).objectStore(storeNames);
};
