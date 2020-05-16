class Store {
  static save(storeKey, data) {
    localStorage.setItem(storeKey, data);
  }

  static get(storeKey) {
    try {
      return JSON.parse(localStorage.getItem(storeKey));
    } catch {
      this.save(storeKey, []);
      return [];
    }
  }
}

export default Store;