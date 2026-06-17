export const storage = {
  get(key: string) {
    return window.localStorage.getItem(key);
  },
  set(key: string, value: string) {
    window.localStorage.setItem(key, value);
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
};
