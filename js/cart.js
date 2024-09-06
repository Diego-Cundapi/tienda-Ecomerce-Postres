export class Cart {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('products')) || [];
  }

  addProductCart(product) {
    let cantidad = 0;
    const found = this.products.find((p) => p[0].name === product.name);
    if (found) {
      found[1]++;
    } else {
      this.products.push([product, cantidad = 1]);
    }
    localStorage.setItem('products', JSON.stringify(this.products));
  }

}
