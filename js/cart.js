export class Cart {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('products')) || [];
    this.listeners = [];
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.products));
  }

  addProductCart(product) {
    const found = this.products.find((p) => p[0].name === product.name);
    if (found) {
      found[1]++;
    } else {
      this.products.push([product, 1]);
    }
    this.saveToLocalStorage();
    this.notifyListeners();
  }

  deleteProductCart(product) {
    this.products = this.products.filter(item => item[0].name !== product[0].name);
    this.saveToLocalStorage();
    this.notifyListeners();
  }

  saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}