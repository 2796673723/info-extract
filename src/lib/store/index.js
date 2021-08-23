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

class ImageLinks {
  #links = writable([]);

  clear() {
    this.#links.set([]);
  }

  init(obj) {
    this.#links.set(obj);
  }

  put(value) {
    this.#links.update((links) => [...links, value]);
  }

  delete(index) {
    this.#links.update((links) => links.filter((_, i) => i !== index));
  }

  getLinks() {
    return this.#links;
  }
}

export const extractUrl = writable("");
export const extractInfo = new InfoClass();
export const extractImages = new ImageLinks();
