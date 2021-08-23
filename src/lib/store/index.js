import { writable } from "svelte/store";

class InfoClass {
  #info = writable({});

  clear() {
    this.#info.set({});
  }

  init(obj) {
    this.#info.set(obj);
  }

  put(key, value) {
    this.#info.update((info) => {
      info[key] = value;
      return info;
    });
  }

  delete(key) {
    this.#info.update((info) => {
      delete info[key];
      return info;
    });
  }

  getJson() {
    return this.#info;
  }
}

export const extractUrl = writable("");
export const extractInfo = new InfoClass();
