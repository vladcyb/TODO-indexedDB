export const createTransaction = (storeNames: 'Item' | 'Category', mode: 'readwrite' | 'readonly') => {
  return window.db.transaction(storeNames, mode).objectStore(storeNames);
};


export const listIndexMethods = {
  getNext: (currIndex: number, lastIndex: number) => {
    if (currIndex === lastIndex) {
      return 0;
    }
    return currIndex + 1;
  },
  getPrev: (currIndex: number, lastIndex: number) => {
    if (currIndex === 0) {
      return lastIndex;
    }
    return currIndex - 1;
  },
};
