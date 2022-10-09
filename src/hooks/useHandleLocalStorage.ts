export const useHandleLocalStorageItem = () => {
  const getLocalStorageItem = (storageItemName: string) => {
    if (typeof window !== "undefined") {
      const localStorageItem = JSON.parse(window.localStorage.getItem(storageItemName) as string);
      return localStorageItem;
    }
  };
  const setLocalStorageItem = (storageItemName: string, content: object) => {
    window.localStorage.setItem(storageItemName, JSON.stringify(content));
  };
  const removeLocalStorageItem = (storageItemName: string) => {
    window.localStorage.removeItem(storageItemName);
  };
  return { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
};
