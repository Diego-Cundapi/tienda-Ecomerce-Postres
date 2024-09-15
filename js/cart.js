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

  deleteProductCart(product){
    // console.log(this.products);
    // console.log(this.products.filter( item => item[0].name === product[0].name));
    // console.log(this.products);
    // console.log(this.products.filter( item => item[0].name !== product[0].name)
    //                           .map(value => value));
    
    /* buscamos todos los productos excepto los que la propiedad name coincida con el producto a eliminar
    posteriormente esos productos los regresamos mediante el map a la variable listaActualizada
    */
    this.products = this.products.filter( item => item[0].name !== product[0].name)
                                        .map(value => value);
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
