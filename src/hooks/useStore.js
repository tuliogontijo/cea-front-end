const useStore = () => {
  const accessStorage = typeof window !== 'undefined';

  const setDataLocalStorage = (key, data) => {
    if (accessStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  const getDataLocalStorage = (key) => {
    if (accessStorage) {
      const data = localStorage.getItem(key);
      const parseData = JSON.parse(data);

      return parseData;
    }
  }

  const removeDataLocalStorage = (key) => {
    if (accessStorage) {
      localStorage.removeItem(key);
    }
  }

  return { getDataLocalStorage,setDataLocalStorage, removeDataLocalStorage };
}

export default useStore;