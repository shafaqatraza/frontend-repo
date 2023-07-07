export const getLocalStorageItem = (key: string) => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
};

export const removeCurrOrganization = () => {
  localStorage.removeItem('currentOrganization');
};